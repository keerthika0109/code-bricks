<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Review\StoreReviewRequest;
use App\Http\Resources\ReviewResource;
use App\Services\Review\ReviewInterface;
use Illuminate\Http\JsonResponse;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class ReviewController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected ReviewInterface $reviewService
    ) {
    }

    /**
     * POST /api/v1/reviews
     * A logged-in user sends a review; it goes to super admin as "pending".
     */
    public function store(StoreReviewRequest $request): JsonResponse
    {
        $userId = JWTAuth::user()->id;
        $review = $this->reviewService->submitReview($userId, $request->validated());

        return $this->created(new ReviewResource($review), 'Thanks! Your review has been submitted for approval.');
    }

    /**
     * GET /api/v1/reviews/mine
     */
    public function mine(): JsonResponse
    {
        $userId = JWTAuth::user()->id;
        $reviews = $this->reviewService->getUserReviews($userId);

        return $this->success(ReviewResource::collection($reviews), 'Your reviews fetched successfully.');
    }

    /**
     * GET /api/v1/designs/{designId}/reviews
     * Public: approved reviews shown under a design.
     */
    public function forDesign(int $designId): JsonResponse
    {
        $reviews = $this->reviewService->getDesignReviews($designId);

        return $this->success(ReviewResource::collection($reviews), 'Design reviews fetched successfully.');
    }
}
