<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
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
     * GET /api/v1/sections
     * Used to render the sidebar: login, logout, animations, cards, buttons, etc.
     */
    public function index(): JsonResponse
    {
        $sections = $this->sectionService->listActiveSections();

        return $this->success(SectionResource::collection($sections), 'Sections fetched successfully.');
    }

    /**
     * GET /api/v1/sections/{slug}
     */
    public function show(string $slug): JsonResponse
    {
        $section = $this->sectionService->findBySlug($slug);

        return $this->success(new SectionResource($section), 'Section fetched successfully.');
    }
}
