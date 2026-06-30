<?php

namespace App\Services\Auth;

use App\Exceptions\UnauthorizedException;
use App\Models\User;
use App\Repositories\User\UserContract;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthService implements AuthInterface
{
    public function __construct(
        protected UserContract $userRepository
    ) {
    }

    public function register(array $data): array
    {
        $user = $this->userRepository->create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => User::ROLE_USER, // public registration can NEVER create a super_admin
            'last_login_at' => now(),
        ]);

        $token = JWTAuth::fromUser($user);

        return $this->buildAuthPayload($user, $token);
    }

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

        return [
            'token' => $token,
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
            'user' => $user,
            'token' => $token,
            'expires_in' => (int) config('jwt.ttl') * 60,
        ];
    }
}
