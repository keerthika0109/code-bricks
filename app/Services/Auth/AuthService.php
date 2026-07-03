<?php

namespace App\Services\Auth;

use App\Exceptions\UnauthorizedException;
use App\Mail\LoginOtpMail;
use App\Models\User;
use App\Repositories\User\UserContract;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService implements AuthInterface
{
    public function __construct(
        protected UserContract $userRepository
    ) {}

    public function register(array $data): array
    {
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
     * Step 1 — verify credentials, send OTP.
     * Returns ['otp_sent' => true, 'email' => $email]
     */
    public function initiateLogin(string $email, string $password): array
    {
        $credentials = ['email' => $email, 'password' => $password];

        // Attempt just to validate credentials (no token yet)
        if (!JWTAuth::attempt($credentials)) {
            throw new UnauthorizedException('Invalid email or password.');
        }

        /** @var User $user */
        $user = JWTAuth::user();
        JWTAuth::invalidate(JWTAuth::getToken()); // discard the token — not logged in yet

        if (!$user->is_active) {
            throw new UnauthorizedException('Your account has been deactivated. Contact the administrator.');
        }

        // Generate 6-digit OTP and store it
        $otp = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        DB::table('login_otps')->where('user_id', $user->id)->delete(); // clear old OTPs
        DB::table('login_otps')->insert([
            'user_id'    => $user->id,
            'otp'        => Hash::make($otp),
            'expires_at' => now()->addMinutes(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Mail::to($user->email)->send(new LoginOtpMail($otp));

        return ['otp_sent' => true, 'email' => $email];
    }

    /**
     * Step 2 — verify OTP and issue JWT.
     */
    public function verifyOtp(string $email, string $otp): array
    {
        $user = User::where('email', $email)->firstOrFail();

        $record = DB::table('login_otps')
            ->where('user_id', $user->id)
            ->where('expires_at', '>', now())
            ->latest('created_at')
            ->first();

        if (!$record || !Hash::check($otp, $record->otp)) {
            throw new UnauthorizedException('Invalid or expired OTP.');
        }

        DB::table('login_otps')->where('user_id', $user->id)->delete();

        $token = JWTAuth::fromUser($user);
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

        return [
            'token'      => $token,
            'expires_in' => (int) config('jwt.ttl') * 60,
        ];
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