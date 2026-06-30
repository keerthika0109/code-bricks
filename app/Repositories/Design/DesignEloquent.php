<?php

namespace App\Repositories\Design;

use App\Models\Design;
use App\Repositories\BaseEloquent;
use Illuminate\Pagination\LengthAwarePaginator;

class DesignEloquent extends BaseEloquent implements DesignContract
{
    public function __construct(Design $model)
    {
        $this->model = $model;
    }

    public function findBySlugInSection(int $sectionId, string $slug): ?Design
    {
        return $this->model
            ->where('section_id', $sectionId)
            ->where('slug', $slug)
            ->first();
    }

    public function paginateFiltered(array $filters): LengthAwarePaginator
    {
        $query = $this->model->query()->with('section')->where('is_published', true);

        if (!empty($filters['section_slug'])) {
            $query->whereHas('section', function ($q) use ($filters) {
                $q->where('slug', $filters['section_slug']);
            });
        }

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if (!empty($filters['tags']) && is_array($filters['tags'])) {
            foreach ($filters['tags'] as $tag) {
                $query->whereJsonContains('tags', $tag);
            }
        }

        $query->orderByDesc('created_at');

        return $query->paginate($filters['per_page'] ?? 24);
    }

    public function incrementViews(int $designId): void
    {
        $this->model->where('id', $designId)->increment('views_count');
    }

    public function incrementDownloads(int $designId): void
    {
        $this->model->where('id', $designId)->increment('downloads_count');
    }

    public function isStoragePathTaken(string $storagePath): bool
    {
        return $this->model->where('storage_path', $storagePath)->exists();
    }
}
