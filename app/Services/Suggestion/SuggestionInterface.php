<?php

namespace App\Services\Suggestion;

use App\Models\Suggestion;
use Illuminate\Pagination\LengthAwarePaginator;

interface SuggestionInterface
{
    public function submitSuggestion(?int $userId, array $data): Suggestion;

    public function paginateAllForAdmin(int $perPage, ?string $status): LengthAwarePaginator;

    public function countUnread(): int;

    public function markAsRead(int $id): void;

    public function markAsResolved(int $id): Suggestion;

    public function deleteSuggestion(int $id): bool;
}
