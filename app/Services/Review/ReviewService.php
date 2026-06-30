<?php

namespace App\Services\Review;

use App\Models\Review;
use App\Repositories\Review\ReviewContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ReviewService implements ReviewInterface
{
    public function __construct(
        protected ReviewContract $reviewRepository
    ) {
    }

    public function submitReview(int $userId, array $data): Review
    {
        /** @var Review $review */
        $review = $this->reviewRepository->create([
            'user_id' => $userId,
            'design_id' => $data['design_id'] ?? null,
            'rating' => $data['rating'] ?? null,
            'comment' => $data['comment'],
            'status' => Review::STATUS_PENDING,
        ]);

        return $review;
    }

    public function getUserReviews(int $userId): Collection
    {
        return $this->reviewRepository->getForUser($userId);
    }

    public function getDesignReviews(int $designId): Collection
    {
        return $this->reviewRepository->getForDesign($designId);
    }

    public function paginateAllForAdmin(int $perPage, ?string $status): LengthAwarePaginator
    {
        return $this->reviewRepository->paginateAll($perPage, $status);
    }

    public function approveReview(int $id): Review
    {
        /** @var Review $review */
        $review = $this->reviewRepository->update($id, ['status' => Review::STATUS_APPROVED]);

        return $review;
    }

    public function rejectReview(int $id): Review
    {
        /** @var Review $review */
        $review = $this->reviewRepository->update($id, ['status' => Review::STATUS_REJECTED]);

        return $review;
    }

    public function deleteReview(int $id): bool
    {
        return $this->reviewRepository->delete($id);
    }
}
