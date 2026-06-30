<?php

namespace App\Services\Section;

use App\Exceptions\NotFoundException;
use App\Models\Section;
use App\Repositories\Section\SectionContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class SectionService implements SectionInterface
{
    public function __construct(
        protected SectionContract $sectionRepository
    ) {
    }

    public function listActiveSections(): Collection
    {
        return $this->sectionRepository->getActiveSectionsOrdered();
    }

    public function listAllSectionsForAdmin(): Collection
    {
        return $this->sectionRepository->getAllOrdered();
    }

    public function findBySlug(string $slug): Section
    {
        $section = $this->sectionRepository->findBySlug($slug);

        if (!$section) {
            throw new NotFoundException("Section '{$slug}' not found.");
        }

        return $section;
    }

    public function createSection(array $data): Section
    {
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        /** @var Section $section */
        $section = $this->sectionRepository->create($data);

        return $section;
    }

    public function updateSection(int $id, array $data): Section
    {
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        /** @var Section $section */
        $section = $this->sectionRepository->update($id, $data);

        return $section;
    }

    public function deleteSection(int $id): bool
    {
        return $this->sectionRepository->delete($id);
    }
}
