<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Design\StoreDesignRequest;
use App\Http\Requests\Design\UpdateDesignFilesRequest;
use App\Http\Requests\Design\UpdateDesignMetaRequest;
use App\Http\Resources\DesignResource;
use App\Services\Design\DesignInterface;
use Illuminate\Http\JsonResponse;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class DesignController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected DesignInterface $designService
    ) {
    }

    /**
     * POST /api/v1/admin/designs
     * Super admin pastes/writes html/css/js and publishes a brand new design
     * (e.g. login design #51) which instantly appears for normal users.
     */
    public function store(StoreDesignRequest $request): JsonResponse
    {
        $adminId = JWTAuth::user()->id;
        $design = $this->designService->createDesign($request->validated(), $adminId);

        return $this->created(new DesignResource($design), 'Design created and published successfully.');
    }

    /**
     * PUT /api/v1/admin/designs/{id}/meta
     */
    public function updateMeta(int $id, UpdateDesignMetaRequest $request): JsonResponse
    {
        $design = $this->designService->updateDesignMeta($id, $request->validated());

        return $this->success(new DesignResource($design), 'Design updated successfully.');
    }

    /**
     * PUT /api/v1/admin/designs/{id}/files
     * Edit the actual html/css/js of an existing design.
     */
    public function updateFiles(int $id, UpdateDesignFilesRequest $request): JsonResponse
    {
        $design = $this->designService->updateDesignFiles($id, $request->validated());

        return $this->success(new DesignResource($design), 'Design files updated successfully.');
    }

    /**
     * DELETE /api/v1/admin/designs/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $this->designService->deleteDesign($id);

        return $this->noContent('Design deleted successfully.');
    }
}
