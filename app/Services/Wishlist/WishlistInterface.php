<?php

namespace App\Services\Wishlist;

use Illuminate\Database\Eloquent\Collection;

interface WishlistInterface
{
    public function getUserWishlist(int $userId): Collection;

    public function addToWishlist(int $userId, int $designId): void;

    public function removeFromWishlist(int $userId, int $designId): void;

    public function toggleWishlist(int $userId, int $designId): bool;
}
