<?php

namespace App\Repositories\Section;

use App\Models\Section;
use App\Repositories\BaseEloquent;
use Illuminate\Database\Eloquent\Collection;

class SectionEloquent extends BaseEloquent implements SectionContract
{
    public function __construct(Section $model)
    {
        $this->model = $model;
    }

    public function findBySlug(string $slug): ?Section
    {
        return $this->model->where('slug', $slug)->first();
    }

    public function getActiveSectionsOrdered(): Collection
    {
        return $this->model
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->withCount('publishedDesigns')
            ->get();
    }

    public function getAllOrdered(): Collection
    {
        return $this->model->orderBy('sort_order')->withCount('designs')->get();
    }
}
