<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepositoryContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

interface UserContract extends BaseRepositoryContract
{
    public function findByEmail(string $email): ?User;

    /**
     * Users with role=user created on/after the given date.
     * Used by the dashboard to compute "new users this week".
     */
    public function getUsersRegisteredSince(Carbon $date): Collection;

    /**
     * Users with role=user created before the given date ("old users").
     */
    public function getUsersRegisteredBefore(Carbon $date): Collection;

    public function countAllNormalUsers(): int;

    public function touchLastLogin(int $userId): void;
}
