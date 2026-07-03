<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\AuthInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected AuthInterface $authService
    ) {
    }

    /**
     * POST /api/v1/auth/register
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->authService->register($request->validated());

        return $this->created([
            'user' => new UserResource($result['user']),
            'token' => $result['token'],
            'token_type' => 'Bearer',
            'expires_in' => $result['expires_in'],
        ], 'Account created successfully. You are now logged in.');
    }

    /**
     * POST /api/v1/auth/login
     * Step 1 — verify credentials, send OTP
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->initiateLogin(
            $request->input('email'),
            $request->input('password')
        );

        return $this->success($result, 'OTP sent to your email.');
    }

    /**
     * POST /api/v1/auth/logout
     */
    public function logout(): JsonResponse
    {
        $this->authService->logout();

        return $this->success(null, 'Logged out successfully.');
    }

    /**
     * POST /api/v1/auth/refresh
     */
    public function refresh(): JsonResponse
    {
        $result = $this->authService->refresh();

        return $this->success([
            'token' => $result['token'],
            'token_type' => 'Bearer',
            'expires_in' => $result['expires_in'],
        ], 'Token refreshed successfully.');
    }

    /**
     * GET /api/v1/auth/me
     */
    public function me(): JsonResponse
    {
        $user = $this->authService->me();

        return $this->success(new UserResource($user), 'Current user fetched.');
    }

    /**
     * POST /api/v1/auth/verify-otp
     * Step 2 — submit OTP, get JWT
     */
    public function verifyOtp(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'otp'   => 'required|digits:6',
        ]);

        $result = $this->authService->verifyOtp(
            $request->input('email'),
            $request->input('otp')
        );

        return $this->success([
            'user'       => new UserResource($result['user']),
            'token'      => $result['token'],
            'token_type' => 'Bearer',
            'expires_in' => $result['expires_in'],
        ], 'Login successful.');
    }

}