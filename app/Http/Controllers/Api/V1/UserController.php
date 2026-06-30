<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Services\User\UserInterface;
use Illuminate\Http\JsonResponse;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected UserInterface $userService
    ) {
    }

    /**
     * GET /api/v1/profile
     */
    public function show(): JsonResponse
    {
        $userId = JWTAuth::user()->id;
        $user = $this->userService->findUser($userId);

        return $this->success(new UserResource($user), 'Profile fetched successfully.');
    }

    /**
     * PUT /api/v1/profile
     */
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $userId = JWTAuth::user()->id;
        $user = $this->userService->updateProfile($userId, $request->validated());

        return $this->success(new UserResource($user), 'Profile updated successfully.');
    }
}
