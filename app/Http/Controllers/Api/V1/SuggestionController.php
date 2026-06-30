<?php

namespace App\Http\Controllers\Api\V1;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Suggestion\StoreSuggestionRequest;
use App\Http\Resources\SuggestionResource;
use App\Services\Suggestion\SuggestionInterface;
use Illuminate\Http\JsonResponse;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class SuggestionController extends Controller
{
    use ApiResponse;

    public function __construct(
        protected SuggestionInterface $suggestionService
    ) {
    }

    /**
     * POST /api/v1/suggestions
     * This powers the "Contact Form" page. Works whether the visitor
     * is logged in (token optional on this route) or a guest.
     */
    public function store(StoreSuggestionRequest $request): JsonResponse
    {
        $userId = null;

        try {
            $userId = JWTAuth::parser()->hasToken() ? JWTAuth::user()?->id : null;
        } catch (\Throwable) {
            $userId = null; // invalid/missing token on an optional-auth route is fine here
        }

        $suggestion = $this->suggestionService->submitSuggestion($userId, $request->validated());

        return $this->created(new SuggestionResource($suggestion), 'Thanks for reaching out! The admin team will review your message.');
    }
}
