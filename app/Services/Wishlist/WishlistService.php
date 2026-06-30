<?php

namespace App\Services\Wishlist;

use App\Exceptions\BusinessValidationException;
use App\Repositories\Design\DesignContract;
use App\Repositories\Wishlist\WishlistContract;
use Illuminate\Database\Eloquent\Collection;

class WishlistService implements WishlistInterface
{
    public function __construct(
        protected WishlistContract $wishlistRepository,
        protected DesignContract $designRepository
    ) {
    }

    public function getUserWishlist(int $userId): Collection
    {
        return $this->wishlistRepository->getForUser($userId);
    }

    public function addToWishlist(int $userId, int $designId): void
    {
        $this->designRepository->findOrFail($designId); // ensures design exists

        if ($this->wishlistRepository->existsForUserAndDesign($userId, $designId)) {
            throw new BusinessValidationException(
                ['design_id' => ['This design is already in your wishlist.']],
                'Already wishlisted.'
            );
        }

        $this->wishlistRepository->create([
            'user_id' => $userId,
            'design_id' => $designId,
        ]);
    }

    public function removeFromWishlist(int $userId, int $designId): void
    {
        $entry = $this->wishlistRepository->findByUserAndDesign($userId, $designId);

        if ($entry) {
            $this->wishlistRepository->delete($entry->id);
        }
    }

    public function toggleWishlist(int $userId, int $designId): bool
    {
        $entry = $this->wishlistRepository->findByUserAndDesign($userId, $designId);

        if ($entry) {
            $this->wishlistRepository->delete($entry->id);
            return false; // now removed
        }

        $this->designRepository->findOrFail($designId);
        $this->wishlistRepository->create(['user_id' => $userId, 'design_id' => $designId]);

        return true; // now added
    }
}
