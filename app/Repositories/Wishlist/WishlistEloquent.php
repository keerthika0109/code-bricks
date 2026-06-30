<?php

namespace App\Repositories\Wishlist;

use App\Models\Wishlist;
use App\Repositories\BaseEloquent;
use Illuminate\Database\Eloquent\Collection;

class WishlistEloquent extends BaseEloquent implements WishlistContract
{
    public function __construct(Wishlist $model)
    {
        $this->model = $model;
    }

    public function getForUser(int $userId): Collection
    {
        return $this->model
            ->where('user_id', $userId)
            ->with(['design.section'])
            ->orderByDesc('created_at')
            ->get();
    }

    public function findByUserAndDesign(int $userId, int $designId): ?Wishlist
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('design_id', $designId)
            ->first();
    }

    public function existsForUserAndDesign(int $userId, int $designId): bool
    {
        return $this->model
            ->where('user_id', $userId)
            ->where('design_id', $designId)
            ->exists();
    }
}
