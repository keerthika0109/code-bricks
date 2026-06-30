<?php

namespace App\Repositories\Section;

use App\Models\Section;
use App\Repositories\BaseRepositoryContract;
use Illuminate\Database\Eloquent\Collection;

interface SectionContract extends BaseRepositoryContract
{
    public function findBySlug(string $slug): ?Section;

    public function getActiveSectionsOrdered(): Collection;

    public function getAllOrdered(): Collection;
}
