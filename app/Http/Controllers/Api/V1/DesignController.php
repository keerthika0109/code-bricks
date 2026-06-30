<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Design\PreviewDesignRequest;
use App\Http\Resources\DesignResource;
use App\Services\Design\DesignInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DesignController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected DesignInterface $designService
    ) {
    }

    /**
     * GET /api/v1/designs?section_slug=login&search=glass&per_page=24
     * Powers the "50+ login designs" grid for whichever sidebar item was clicked.
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->only(['section_slug', 'search', 'per_page']);
        $filters['tags'] = $request->input('tags', []);

        $designs = $this->designService->listDesigns($filters);

        return $this->success(
            DesignResource::collection($designs->items()),
            'Designs fetched successfully.',
            200,
            [
                'pagination' => [
                    'current_page' => $designs->currentPage(),
                    'per_page' => $designs->perPage(),
                    'total' => $designs->total(),
                    'last_page' => $designs->lastPage(),
                ],
            ]
        );
    }

    /**
     * GET /api/v1/designs/{id}
     * Returns design metadata PLUS the raw html/css/js — this is what
     * powers "Get Code" with the copy button on the frontend.
     */
    public function show(int $id): JsonResponse
    {
        $result = $this->designService->getDesignDetail($id);

        return $this->success([
            'design' => new DesignResource($result['design']),
            'code' => $result['files'],
        ], 'Design detail fetched successfully.');
    }

    /**
     * POST /api/v1/designs/{id}/preview
     * Body: { "overrides": { "--primary-color": "#ff6b6b", "--radius": "20px" } }
     * Used by the live customizer: returns html/css/js with the chosen
     * CSS variables patched in, for instant iframe re-render.
     */
    public function preview(int $id, PreviewDesignRequest $request): JsonResponse
    {
        $overrides = $request->validated('overrides', []);

        $files = $this->designService->previewWithCustomization($id, $overrides ?? []);

        return $this->success($files, 'Preview generated successfully.');
    }

    /**
     * POST /api/v1/designs/{id}/download
     * Body: { "overrides": {...} }  (optional)
     * Streams back a ready-to-use ZIP (index.html, style.css, script.js).
     */
    public function download(int $id, PreviewDesignRequest $request)
    {
        $overrides = $request->validated('overrides', []) ?? [];

        $zipPath = $this->designService->downloadDesign($id, $overrides);

        return response()->download($zipPath, basename($zipPath))->deleteFileAfterSend(true);
    }
}
