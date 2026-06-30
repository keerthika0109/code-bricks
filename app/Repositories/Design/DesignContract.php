<?php

namespace App\Repositories\Design;

use App\Models\Design;
use App\Repositories\BaseRepositoryContract;
use Illuminate\Pagination\LengthAwarePaginator;

interface DesignContract extends BaseRepositoryContract
{
    public function findBySlugInSection(int $sectionId, string $slug): ?Design;

    /**
     * Paginated, filterable list of designs.
     *
     * @param array{section_slug?: string, search?: string, tags?: array, per_page?: int} $filters
     */
    public function paginateFiltered(array $filters): LengthAwarePaginator;

    public function incrementViews(int $designId): void;

    public function incrementDownloads(int $designId): void;

    public function isStoragePathTaken(string $storagePath): bool;
}
