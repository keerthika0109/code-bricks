<?php

namespace App\Services\Review;

use App\Models\Review;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface ReviewInterface
{
    public function submitReview(int $userId, array $data): Review;

    public function getUserReviews(int $userId): Collection;

    public function getDesignReviews(int $designId): Collection;

    public function paginateAllForAdmin(int $perPage, ?string $status): LengthAwarePaginator;

    public function approveReview(int $id): Review;

    public function rejectReview(int $id): Review;

    public function deleteReview(int $id): bool;
}
