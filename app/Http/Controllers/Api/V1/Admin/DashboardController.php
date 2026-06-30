<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\Dashboard\DashboardInterface;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected DashboardInterface $dashboardService
    ) {
    }

    /**
     * GET /api/v1/admin/dashboard
     * Super-admin-only overview: total/new/old users, unread suggestions,
     * pending reviews, total designs & sections.
     */
    public function overview(): JsonResponse
    {
        $overview = $this->dashboardService->getAdminOverview();
        $overview['new_users'] = UserResource::collection($overview['new_users']);

        return $this->success($overview, 'Dashboard overview fetched successfully.');
    }
}
