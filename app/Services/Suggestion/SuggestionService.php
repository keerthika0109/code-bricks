<?php

namespace App\Services\Suggestion;

use App\Models\Suggestion;
use App\Repositories\Suggestion\SuggestionContract;
use Illuminate\Pagination\LengthAwarePaginator;

class SuggestionService implements SuggestionInterface
{
    public function __construct(
        protected SuggestionContract $suggestionRepository
    ) {
    }

    public function submitSuggestion(?int $userId, array $data): Suggestion
    {
        /** @var Suggestion $suggestion */
        $suggestion = $this->suggestionRepository->create([
            'user_id' => $userId,
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
            'subject' => $data['subject'],
            'message' => $data['message'],
            'status' => Suggestion::STATUS_UNREAD,
        ]);

        return $suggestion;
    }

    public function paginateAllForAdmin(int $perPage, ?string $status): LengthAwarePaginator
    {
        return $this->suggestionRepository->paginateAll($perPage, $status);
    }

    public function countUnread(): int
    {
        return $this->suggestionRepository->countUnread();
    }

    public function markAsRead(int $id): void
    {
        $this->suggestionRepository->markAsRead($id);
    }

    public function markAsResolved(int $id): Suggestion
    {
        /** @var Suggestion $suggestion */
        $suggestion = $this->suggestionRepository->update($id, ['status' => Suggestion::STATUS_RESOLVED]);

        return $suggestion;
    }

    public function deleteSuggestion(int $id): bool
    {
        return $this->suggestionRepository->delete($id);
    }
}
