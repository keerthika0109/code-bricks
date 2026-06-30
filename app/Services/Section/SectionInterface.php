<?php

namespace App\Services\Section;

use App\Models\Section;
use Illuminate\Database\Eloquent\Collection;

interface SectionInterface
{
    public function listActiveSections(): Collection;

    public function listAllSectionsForAdmin(): Collection;

    public function findBySlug(string $slug): Section;

    public function createSection(array $data): Section;

    public function updateSection(int $id, array $data): Section;

    public function deleteSection(int $id): bool;
}
