<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface UserInterface
{
    public function paginateUsers(int $perPage = 15): LengthAwarePaginator;

    public function findUser(int $id): User;

    public function deactivateUser(int $id): User;

    public function activateUser(int $id): User;

    public function deleteUser(int $id): bool;

    public function updateProfile(int $userId, array $data): User;

    /**
     * New normal users registered within the last 7 days (for dashboard).
     */
    public function getNewUsersThisWeek(): Collection;

    /**
     * Normal users registered more than 7 days ago (for dashboard).
     */
    public function getOldUsers(): Collection;

    public function getUserStats(): array;
}
