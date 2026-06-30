<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\User\UserInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected UserInterface $userService
    ) {
    }

    /**
     * GET /api/v1/admin/users
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->input('per_page', 15);
        $users = $this->userService->paginateUsers($perPage);

        return $this->success(
            UserResource::collection($users->items()),
            'Users fetched successfully.',
            200,
            ['pagination' => [
                'current_page' => $users->currentPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
                'last_page' => $users->lastPage(),
            ]]
        );
    }

    /**
     * GET /api/v1/admin/users/{id}
     */
    public function show(int $id): JsonResponse
    {
        $user = $this->userService->findUser($id);

        return $this->success(new UserResource($user), 'User fetched successfully.');
    }

    /**
     * PATCH /api/v1/admin/users/{id}/deactivate
     */
    public function deactivate(int $id): JsonResponse
    {
        $user = $this->userService->deactivateUser($id);

        return $this->success(new UserResource($user), 'User deactivated successfully.');
    }

    /**
     * PATCH /api/v1/admin/users/{id}/activate
     */
    public function activate(int $id): JsonResponse
    {
        $user = $this->userService->activateUser($id);

        return $this->success(new UserResource($user), 'User activated successfully.');
    }

    /**
     * DELETE /api/v1/admin/users/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $this->userService->deleteUser($id);

        return $this->noContent('User deleted successfully.');
    }

    /**
     * GET /api/v1/admin/users/stats
     * Powers the dashboard's "new users this week vs old users" cards.
     */
    public function stats(): JsonResponse
    {
        $stats = $this->userService->getUserStats();
        $stats['new_users_list'] = UserResource::collection($stats['new_users_list']);
        $stats['old_users_list'] = UserResource::collection($stats['old_users_list']);

        return $this->success($stats, 'User stats fetched successfully.');
    }
}
