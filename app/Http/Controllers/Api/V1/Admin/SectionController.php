<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Section\StoreSectionRequest;
use App\Http\Requests\Section\UpdateSectionRequest;
use App\Http\Resources\SectionResource;
use App\Services\Section\SectionInterface;
use Illuminate\Http\JsonResponse;

class SectionController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected SectionInterface $sectionService
    ) {
    }

    /**
     * GET /api/v1/admin/sections
     */
    public function index(): JsonResponse
    {
        $sections = $this->sectionService->listAllSectionsForAdmin();

        return $this->success(SectionResource::collection($sections), 'Sections fetched successfully.');
    }

    /**
     * POST /api/v1/admin/sections
     */
    public function store(StoreSectionRequest $request): JsonResponse
    {
        $section = $this->sectionService->createSection($request->validated());

        return $this->created(new SectionResource($section), 'Section created successfully.');
    }

    /**
     * PUT /api/v1/admin/sections/{id}
     */
    public function update(int $id, UpdateSectionRequest $request): JsonResponse
    {
        $section = $this->sectionService->updateSection($id, $request->validated());

        return $this->success(new SectionResource($section), 'Section updated successfully.');
    }

    /**
     * DELETE /api/v1/admin/sections/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $this->sectionService->deleteSection($id);

        return $this->noContent('Section deleted successfully.');
    }
}
