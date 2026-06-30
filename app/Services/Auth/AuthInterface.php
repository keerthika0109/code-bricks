<?php

namespace App\Services\Auth;

use App\Models\User;

interface AuthInterface
{
    /**
     * @return array{user: User, token: string, expires_in: int}
     */
    public function register(array $data): array;

    /**
     * @return array{user: User, token: string, expires_in: int}
     */
    public function login(string $email, string $password): array;

    public function logout(): void;

    /**
     * @return array{token: string, expires_in: int}
     */
    public function refresh(): array;

    public function me(): User;
}
