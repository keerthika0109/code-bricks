<?php

namespace App\Services\Design;

use App\Models\Design;
use Illuminate\Pagination\LengthAwarePaginator;

interface DesignInterface
{
    public function listDesigns(array $filters): LengthAwarePaginator;

    public function getDesignDetail(int $id): array;

    /**
     * @return array{html: string, css: string, js: string}
     */
    public function previewWithCustomization(int $id, array $overrides): array;

    /**
     * @return string Absolute path to the generated zip file.
     */
    public function downloadDesign(int $id, array $overrides): string;

    public function createDesign(array $data, ?int $createdBy): Design;

    public function updateDesignMeta(int $id, array $data): Design;

    public function updateDesignFiles(int $id, array $files): Design;

    public function deleteDesign(int $id): bool;
}
