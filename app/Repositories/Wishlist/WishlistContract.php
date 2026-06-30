<?php

namespace App\Repositories\Wishlist;

use App\Models\Wishlist;
use App\Repositories\BaseRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

interface WishlistContract extends BaseRepositoryContract
{
    public function getForUser(int $userId): Collection;

    public function findByUserAndDesign(int $userId, int $designId): ?Wishlist;

    public function existsForUserAndDesign(int $userId, int $designId): bool;
}
