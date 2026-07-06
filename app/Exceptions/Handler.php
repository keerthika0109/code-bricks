<?php

namespace App\Exceptions;

use App\Helpers\ApiResponse;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Exceptions\InvalidSignatureException;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

/**
 * Global Exception Handler
 *
 * EVERY exception thrown anywhere in the app (controller, service,
 * repository, middleware, or Laravel internals) passes through here
 * exactly once before becoming an HTTP response. This is what
 * guarantees that hitting any endpoint in Postman — even ones that
 * crash — always returns the same clean JSON envelope instead of an
 * HTML stack trace or an inconsistent ad-hoc error shape.
 */
class Handler extends ExceptionHandler
{
    use ApiResponse;

    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Force JSON rendering for every request under /api/*.
     * The frontend is a React SPA talking purely over JSON, so the
     * web (Blade/session) error pages are irrelevant here.
     */
    public function render($request, Throwable $e)
    {
        if ($request->is('api/*') || $request->expectsJson()) {
            return $this->handleApiException($request, $e);
        }

        return parent::render($request, $e);
    }

    protected function handleApiException(Request $request, Throwable $e)
    {
        // --- Our own predictable application exceptions ---
        if ($e instanceof ApiException) {
            return $this->error($e->getMessage(), $e->getStatusCode(), $e->getErrors(), $e->getErrorCode());
        }

        // --- Laravel form-request / validator failures ---
        if ($e instanceof ValidationException) {
            return $this->validationError($e->errors(), 'The given data was invalid.');
        }

        // --- JWT specific failures (very common in Postman testing) ---
        if ($e instanceof TokenExpiredException) {
            return $this->error('Your session token has expired. Please login again.', 401, null, 'TOKEN_EXPIRED');
        }

        if ($e instanceof TokenInvalidException) {
            return $this->error('The token provided is invalid.', 401, null, 'TOKEN_INVALID');
        }

        if ($e instanceof JWTException) {
            return $this->error('Authorization token was not found. Send it as: Authorization: Bearer <token>', 401, null, 'TOKEN_NOT_FOUND');
        }

        // --- Standard Laravel auth/authorization ---
        if ($e instanceof AuthenticationException) {
            return $this->unauthorized('You must be logged in to access this resource.');
        }

        if ($e instanceof AuthorizationException) {
            return $this->forbidden();
        }

        // --- Model / route not found ---
        if ($e instanceof ModelNotFoundException) {
            $modelName = class_basename($e->getModel());

            return $this->notFound("{$modelName} not found.");
        }

        if ($e instanceof NotFoundHttpException) {
            return $this->notFound('The requested endpoint does not exist. Please check the URL and HTTP method.');
        }

        // --- Method not allowed (very common Postman mistake: wrong verb) ---
        if ($e instanceof HttpExceptionInterface && $e->getStatusCode() === 405) {
            return $this->error(
                'This HTTP method is not allowed for this endpoint. Check whether you should use GET, POST, PUT, PATCH or DELETE.',
                405,
                null,
                'METHOD_NOT_ALLOWED'
            );
        }

        if ($e instanceof InvalidSignatureException) {
            return $this->error('Invalid or expired signed URL.', 403, null, 'INVALID_SIGNATURE');
        }

        if ($e instanceof HttpResponseException) {
            return $e->getResponse();
        }

        // --- Generic HTTP exceptions (anything else with a status code) ---
        if ($e instanceof HttpExceptionInterface) {
            return $this->error($e->getMessage() ?: 'An HTTP error occurred.', $e->getStatusCode(), null, 'HTTP_ERROR');
        }

        // --- Fallback: unexpected server errors ---
        Log::error('Unhandled exception: ' . $e->getMessage(), [
            'exception' => $e,
            'url' => $request->fullUrl(),
            'method' => $request->method(),
        ]);

        $debug = config('app.debug');

        return $this->error(
            $debug ? $e->getMessage() : 'Internal server error. Please try again later.',
            500,
                $debug ? [
            'trace' => collect($e->getTrace())->take(5)->map(function($frame) {
                unset($frame['args']);
                return $frame;
            })->toArray(),
            'file' => $e->getFile(),
            'line' => $e->getLine()
        ] : null,
            'SERVER_ERROR'
        );
    }
}
