<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseEloquent;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Carbon;

class UserEloquent extends BaseEloquent implements UserContract
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function findByEmail(string $email): ?User
    {
        return $this->model->where('email', $email)->first();
    }

    public function getUsersRegisteredSince(Carbon $date): Collection
    {
        return $this->model
            ->where('role', User::ROLE_USER)
            ->where('created_at', '>=', $date)
            ->orderByDesc('created_at')
            ->get();
    }

    public function getUsersRegisteredBefore(Carbon $date): Collection
    {
        return $this->model
            ->where('role', User::ROLE_USER)
            ->where('created_at', '<', $date)
            ->orderByDesc('created_at')
            ->get();
    }

    public function countAllNormalUsers(): int
    {
        return $this->model->where('role', User::ROLE_USER)->count();
    }

    public function touchLastLogin(int $userId): void
    {
        $this->model->where('id', $userId)->update(['last_login_at' => now()]);
    }
}
