<?php

namespace App\Repositories\Review;

use App\Models\Review;
use App\Repositories\BaseEloquent;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ReviewEloquent extends BaseEloquent implements ReviewContract
{
    public function __construct(Review $model)
    {
        $this->model = $model;
    }

    public function getForUser(int $userId): Collection
    {
        return $this->model->where('user_id', $userId)->with('design')->orderByDesc('created_at')->get();
    }

    public function paginateAll(int $perPage = 15, ?string $status = null): LengthAwarePaginator
    {
        $query = $this->model->with(['user', 'design'])->orderByDesc('created_at');

        if ($status) {
            $query->where('status', $status);
        }

        return $query->paginate($perPage);
    }

    public function getForDesign(int $designId): Collection
    {
        return $this->model
            ->where('design_id', $designId)
            ->where('status', Review::STATUS_APPROVED)
            ->with('user:id,name,avatar')
            ->orderByDesc('created_at')
            ->get();
    }
}
