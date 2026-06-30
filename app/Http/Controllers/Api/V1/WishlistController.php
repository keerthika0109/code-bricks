<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Services\Wishlist\WishlistInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class WishlistController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected WishlistInterface $wishlistService
    ) {
    }

    /**
     * GET /api/v1/wishlist
     */
    public function index(): JsonResponse
    {
        $userId = JWTAuth::user()->id;
        $wishlist = $this->wishlistService->getUserWishlist($userId);

        return $this->success($wishlist, 'Wishlist fetched successfully.');
    }

    /**
     * POST /api/v1/wishlist
     * Body: { "design_id": 12 }
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate(['design_id' => ['required', 'integer', 'exists:designs,id']]);

        $userId = JWTAuth::user()->id;
        $this->wishlistService->addToWishlist($userId, $request->input('design_id'));

        return $this->created(null, 'Design added to wishlist.');
    }

    /**
     * DELETE /api/v1/wishlist/{designId}
     */
    public function destroy(int $designId): JsonResponse
    {
        $userId = JWTAuth::user()->id;
        $this->wishlistService->removeFromWishlist($userId, $designId);

        return $this->noContent('Design removed from wishlist.');
    }

    /**
     * POST /api/v1/wishlist/{designId}/toggle
     * Convenience endpoint for a heart-icon toggle button on the frontend.
     */
    public function toggle(int $designId): JsonResponse
    {
        $userId = JWTAuth::user()->id;
        $added = $this->wishlistService->toggleWishlist($userId, $designId);

        return $this->success(
            ['wishlisted' => $added],
            $added ? 'Added to wishlist.' : 'Removed from wishlist.'
        );
    }
}
