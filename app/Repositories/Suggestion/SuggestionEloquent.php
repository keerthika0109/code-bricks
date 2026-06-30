<?php

namespace App\Repositories\Suggestion;

use App\Models\Suggestion;
use App\Repositories\BaseEloquent;
use Illuminate\Pagination\LengthAwarePaginator;

class SuggestionEloquent extends BaseEloquent implements SuggestionContract
{
    public function __construct(Suggestion $model)
    {
        $this->model = $model;
    }

    public function paginateAll(int $perPage = 15, ?string $status = null): LengthAwarePaginator
    {
        $query = $this->model->with('user:id,name,email')->orderByDesc('created_at');

        if ($status) {
            $query->where('status', $status);
        }

        return $query->paginate($perPage);
    }

    public function countUnread(): int
    {
        return $this->model->where('status', Suggestion::STATUS_UNREAD)->count();
    }

    public function markAsRead(int $id): void
    {
        $this->model->where('id', $id)->update(['status' => Suggestion::STATUS_READ]);
    }
}
