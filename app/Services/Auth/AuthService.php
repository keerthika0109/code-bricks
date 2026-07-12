<?php

namespace App\Services\Auth;

use App\Exceptions\UnauthorizedException;
use App\Models\User;
use App\Repositories\User\UserContract;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService implements AuthInterface
{
    public function __construct(
        protected UserContract $userRepository
    ) {}

    /**
     * Step 1 of register — validate data, send OTP (don't create user yet)
     */
    public function sendRegisterOtp(array $data): array
    {
        $email = $data['email'];

        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        DB::table('login_otps')->where('email', $email)->delete();
        DB::table('login_otps')->insert([
            'email'      => $email,
            'otp'        => Hash::make($otp),
            'payload'    => json_encode($data),
            'expires_at' => now()->addMinutes(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // No mail — return OTP directly in response
        return ['otp_sent' => true, 'email' => $email, 'otp' => $otp];
    }

    /**
     * Step 2 of register — verify OTP, create user, return JWT
     */
    public function verifyRegisterOtp(string $email, string $otp): array
    {
        $record = DB::table('login_otps')
            ->where('email', $email)
            ->where('expires_at', '>', now())
            ->latest('created_at')
            ->first();

        if (!$record || !Hash::check($otp, $record->otp)) {
            throw new UnauthorizedException('Invalid or expired OTP.');
        }

        $data = json_decode($record->payload, true);

        DB::table('login_otps')->where('email', $email)->delete();

        $user = $this->userRepository->create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password'      => Hash::make($data['password']),
            'role'          => User::ROLE_USER,
            'last_login_at' => now(),
        ]);

        $token = JWTAuth::fromUser($user);

        return $this->buildAuthPayload($user, $token);
    }

    /**
     * Simple login — no OTP
     */
    public function login(string $email, string $password): array
    {
        $credentials = ['email' => $email, 'password' => $password];

        if (!$token = JWTAuth::attempt($credentials)) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        /** @var User $user */
        $user = JWTAuth::user();

        if (!$user->is_active) {
            throw new UnauthorizedException('Your account has been deactivated. Contact the administrator.');
        }

        $this->userRepository->touchLastLogin($user->id);
        $user->refresh();

        return $this->buildAuthPayload($user, $token);
    }

    public function logout(): void
    {
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    public function refresh(): array
    {
        $token = JWTAuth::refresh(JWTAuth::getToken());
        return ['token' => $token, 'expires_in' => (int) config('jwt.ttl') * 60];
    }

    public function me(): User
    {
        return JWTAuth::user();
    }

    protected function buildAuthPayload(User $user, string $token): array
    {
        return [
            'user'       => $user,
            'token'      => $token,
            'expires_in' => (int) config('jwt.ttl') * 60,
        ];
    }
}