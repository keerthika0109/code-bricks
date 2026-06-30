<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Services\Review\ReviewInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected ReviewInterface $reviewService
    ) {
    }

    /**
     * GET /api/v1/admin/reviews?status=pending
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->input('per_page', 15);
        $status = $request->input('status'); // pending | approved | rejected | null=all

        $reviews = $this->reviewService->paginateAllForAdmin($perPage, $status);

        return $this->success(
            ReviewResource::collection($reviews->items()),
            'Reviews fetched successfully.',
            200,
            ['pagination' => [
                'current_page' => $reviews->currentPage(),
                'per_page' => $reviews->perPage(),
                'total' => $reviews->total(),
                'last_page' => $reviews->lastPage(),
            ]]
        );
    }

    /**
     * PATCH /api/v1/admin/reviews/{id}/approve
     */
    public function approve(int $id): JsonResponse
    {
        $review = $this->reviewService->approveReview($id);

        return $this->success(new ReviewResource($review), 'Review approved successfully.');
    }

    /**
     * PATCH /api/v1/admin/reviews/{id}/reject
     */
    public function reject(int $id): JsonResponse
    {
        $review = $this->reviewService->rejectReview($id);

        return $this->success(new ReviewResource($review), 'Review rejected successfully.');
    }

    /**
     * DELETE /api/v1/admin/reviews/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $this->reviewService->deleteReview($id);

        return $this->noContent('Review deleted successfully.');
    }
}
