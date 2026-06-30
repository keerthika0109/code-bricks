<?php

namespace App\Services\User;

use App\Models\User;
use App\Repositories\User\UserContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class UserService implements UserInterface
{
    public function __construct(
        protected UserContract $userRepository
    ) {
    }

    public function paginateUsers(int $perPage = 15): LengthAwarePaginator
    {
        return $this->userRepository->paginate($perPage);
    }

    public function findUser(int $id): User
    {
        /** @var User $user */
        $user = $this->userRepository->findOrFail($id);

        return $user;
    }

    public function deactivateUser(int $id): User
    {
        /** @var User $user */
        $user = $this->userRepository->update($id, ['is_active' => false]);

        return $user;
    }

    public function activateUser(int $id): User
    {
        /** @var User $user */
        $user = $this->userRepository->update($id, ['is_active' => true]);

        return $user;
    }

    public function deleteUser(int $id): bool
    {
        return $this->userRepository->delete($id);
    }

    public function updateProfile(int $userId, array $data): User
    {
        $payload = [];

        if (isset($data['name'])) {
            $payload['name'] = $data['name'];
        }

        if (isset($data['avatar'])) {
            $payload['avatar'] = $data['avatar'];
        }

        if (!empty($data['password'])) {
            $payload['password'] = Hash::make($data['password']);
        }

        /** @var User $user */
        $user = $this->userRepository->update($userId, $payload);

        return $user;
    }

    public function getNewUsersThisWeek(): Collection
    {
        return $this->userRepository->getUsersRegisteredSince(Carbon::now()->subDays(7));
    }

    public function getOldUsers(): Collection
    {
        return $this->userRepository->getUsersRegisteredBefore(Carbon::now()->subDays(7));
    }

    public function getUserStats(): array
    {
        $newUsers = $this->getNewUsersThisWeek();
        $oldUsers = $this->getOldUsers();

        return [
            'total_users' => $this->userRepository->countAllNormalUsers(),
            'new_users_this_week' => $newUsers->count(),
            'old_users' => $oldUsers->count(),
            'new_users_list' => $newUsers->values(),
            'old_users_list' => $oldUsers->values(),
        ];
    }
}
