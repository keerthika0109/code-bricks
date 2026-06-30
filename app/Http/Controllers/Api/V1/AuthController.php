<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\Auth\AuthInterface;
use Illuminate\Http\JsonResponse;

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
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login($request->input('email'), $request->input('password'));

        return $this->success([
            'user' => new UserResource($result['user']),
            'token' => $result['token'],
            'token_type' => 'Bearer',
            'expires_in' => $result['expires_in'],
        ], 'Login successful.');
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
}
