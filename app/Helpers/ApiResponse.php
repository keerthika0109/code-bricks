<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

/**
 * ApiResponse
 *
 * Every controller in this project uses this trait so that EVERY endpoint,
 * without exception, returns the same JSON envelope shape. This is what
 * makes the API "Postman-clear": you always know where to look.
 *
 * SUCCESS SHAPE:
 * {
 *   "success": true,
 *   "message": "Human readable message",
 *   "data": { ... } | [ ... ] | null,
 *   "meta": { "pagination": {...} }  // optional, only present when paginated
 * }
 *
 * ERROR SHAPE:
 * {
 *   "success": false,
 *   "message": "Human readable error message",
 *   "errors": { "field": ["validation message"] } | null,
 *   "error_code": "VALIDATION_ERROR" | "NOT_FOUND" | "UNAUTHORIZED" | ...
 * }
 */
trait ApiResponse
{
    protected function success(
        mixed $data = null,
        string $message = 'Request was successful',
        int $statusCode = 200,
        array $meta = []
    ): JsonResponse {
        $payload = [
            'success' => true,
            'message' => $message,
            'data' => $data,
        ];

        if (!empty($meta)) {
            $payload['meta'] = $meta;
        }

        return response()->json($payload, $statusCode);
    }

    protected function created(mixed $data = null, string $message = 'Resource created successfully'): JsonResponse
    {
        return $this->success($data, $message, 201);
    }

    protected function noContent(string $message = 'Resource deleted successfully'): JsonResponse
    {
        return $this->success(null, $message, 200);
    }

    protected function error(
        string $message = 'Something went wrong',
        int $statusCode = 400,
        ?array $errors = null,
        string $errorCode = 'BAD_REQUEST'
    ): JsonResponse {
        $payload = [
            'success' => false,
            'message' => $message,
            'errors' => $errors,
            'error_code' => $errorCode,
        ];

        // Log server-side errors (5xx) for debugging; never log 4xx noise.
        if ($statusCode >= 500) {
            Log::error($message, ['errors' => $errors, 'error_code' => $errorCode]);
        }

        return response()->json($payload, $statusCode);
    }

    protected function validationError(array $errors, string $message = 'Validation failed'): JsonResponse
    {
        return $this->error($message, 422, $errors, 'VALIDATION_ERROR');
    }

    protected function unauthorized(string $message = 'Unauthenticated. Please login.'): JsonResponse
    {
        return $this->error($message, 401, null, 'UNAUTHORIZED');
    }

    protected function forbidden(string $message = 'You do not have permission to perform this action.'): JsonResponse
    {
        return $this->error($message, 403, null, 'FORBIDDEN');
    }

    protected function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return $this->error($message, 404, null, 'NOT_FOUND');
    }

    protected function serverError(string $message = 'Internal server error', ?\Throwable $e = null): JsonResponse
    {
        if ($e) {
            Log::error($e->getMessage(), ['exception' => $e]);
        }

        return $this->error($message, 500, null, 'SERVER_ERROR');
    }
}
