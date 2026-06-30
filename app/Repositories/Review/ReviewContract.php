<?php

namespace App\Repositories\Review;

use App\Repositories\BaseRepositoryContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface ReviewContract extends BaseRepositoryContract
{
    public function getForUser(int $userId): Collection;

    public function paginateAll(int $perPage = 15, ?string $status = null): LengthAwarePaginator;

    public function getForDesign(int $designId): Collection;
}
