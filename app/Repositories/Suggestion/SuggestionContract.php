<?php

namespace App\Repositories\Suggestion;

use App\Repositories\BaseRepositoryContract;
use Illuminate\Pagination\LengthAwarePaginator;

interface SuggestionContract extends BaseRepositoryContract
{
    public function paginateAll(int $perPage = 15, ?string $status = null): LengthAwarePaginator;

    public function countUnread(): int;

    public function markAsRead(int $id): void;
}
