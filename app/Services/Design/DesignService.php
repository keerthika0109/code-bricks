<?php

namespace App\Services\Design;

use App\Exceptions\BusinessValidationException;
use App\Exceptions\NotFoundException;
use App\Models\Design;
use App\Repositories\Design\DesignContract;
use App\Services\Snippet\SnippetInterface;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class DesignService implements DesignInterface
{
    public function __construct(
        protected DesignContract $designRepository,
        protected SnippetInterface $snippetService
    ) {
    }

    public function listDesigns(array $filters): LengthAwarePaginator
    {
        return $this->designRepository->paginateFiltered($filters);
    }

    public function getDesignDetail(int $id): array
    {
        /** @var Design $design */
        $design = $this->designRepository->findOrFail($id);
        $design->load('section');

        $this->designRepository->incrementViews($id);

        $files = $this->snippetService->readSnippetFiles($design);

        return [
            'design' => $design,
            'files' => $files,
        ];
    }

    public function previewWithCustomization(int $id, array $overrides): array
    {
        /** @var Design $design */
        $design = $this->designRepository->findOrFail($id);

        return $this->snippetService->applyCustomization($design, $overrides);
    }

    public function downloadDesign(int $id, array $overrides): string
    {
        /** @var Design $design */
        $design = $this->designRepository->findOrFail($id);
        $design->load('section');

        $this->designRepository->incrementDownloads($id);

        return $this->snippetService->buildZip($design, $overrides);
    }

    public function createDesign(array $data, ?int $createdBy): Design
    {
        $slug = $data['slug'] ?? Str::slug($data['title']);
        $sectionSlug = $data['section_slug'];
        $storagePath = "{$sectionSlug}/{$slug}";

        if ($this->designRepository->isStoragePathTaken($storagePath)) {
            throw new BusinessValidationException(
                ['slug' => ['A design with this slug already exists in this section.']],
                'Duplicate design slug.'
            );
        }

        $this->snippetService->writeSnippetFiles(
            $storagePath,
            $data['html'],
            $data['css'] ?? '',
            $data['js'] ?? ''
        );

        /** @var Design $design */
        $design = $this->designRepository->create([
            'section_id' => $data['section_id'],
            'created_by' => $createdBy,
            'title' => $data['title'],
            'slug' => $slug,
            'description' => $data['description'] ?? null,
            'thumbnail' => $data['thumbnail'] ?? null,
            'storage_path' => $storagePath,
            'customizable_vars' => $data['customizable_vars'] ?? null,
            'tags' => $data['tags'] ?? null,
            'is_published' => $data['is_published'] ?? true,
        ]);

        return $design;
    }

    public function updateDesignMeta(int $id, array $data): Design
    {
        /** @var Design $design */
        $design = $this->designRepository->update($id, $data);

        return $design;
    }

    public function updateDesignFiles(int $id, array $files): Design
    {
        /** @var Design $design */
        $design = $this->designRepository->findOrFail($id);

        $this->snippetService->writeSnippetFiles(
            $design->storage_path,
            $files['html'] ?? $this->snippetService->readSnippetFiles($design)['html'],
            $files['css'] ?? null,
            $files['js'] ?? null
        );

        return $design;
    }

    public function deleteDesign(int $id): bool
    {
        /** @var Design $design */
        $design = $this->designRepository->findOrFail($id);

        $this->snippetService->deleteSnippetFiles($design->storage_path);

        return $this->designRepository->delete($id);
    }
}
