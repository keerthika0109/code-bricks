<?php

namespace App\Services\Auth;

use App\Models\User;

interface AuthInterface
{
    /**
     * Step 1 of register — validate and send OTP
     * @return array{otp_sent: bool, email: string}
     */
    public function sendRegisterOtp(array $data): array;

    /**
     * Step 2 of register — verify OTP and create account
     * @return array{user: User, token: string, expires_in: int}
     */
    public function verifyRegisterOtp(string $email, string $otp): array;

    /**
     * Simple login — no OTP
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