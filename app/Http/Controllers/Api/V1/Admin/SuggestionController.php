<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\SuggestionResource;
use App\Services\Suggestion\SuggestionInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SuggestionController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected SuggestionInterface $suggestionService
    ) {
    }

    /**
     * GET /api/v1/admin/suggestions?status=unread
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = (int) $request->input('per_page', 15);
        $status = $request->input('status');

        $suggestions = $this->suggestionService->paginateAllForAdmin($perPage, $status);

        return $this->success(
            SuggestionResource::collection($suggestions->items()),
            'Suggestions fetched successfully.',
            200,
            ['pagination' => [
                'current_page' => $suggestions->currentPage(),
                'per_page' => $suggestions->perPage(),
                'total' => $suggestions->total(),
                'last_page' => $suggestions->lastPage(),
            ]]
        );
    }

    /**
     * PATCH /api/v1/admin/suggestions/{id}/read
     */
    public function markRead(int $id): JsonResponse
    {
        $this->suggestionService->markAsRead($id);

        return $this->success(null, 'Suggestion marked as read.');
    }

    /**
     * PATCH /api/v1/admin/suggestions/{id}/resolve
     */
    public function markResolved(int $id): JsonResponse
    {
        $suggestion = $this->suggestionService->markAsResolved($id);

        return $this->success(new SuggestionResource($suggestion), 'Suggestion marked as resolved.');
    }

    /**
     * DELETE /api/v1/admin/suggestions/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $this->suggestionService->deleteSuggestion($id);

        return $this->noContent('Suggestion deleted successfully.');
    }
}
