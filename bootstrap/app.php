<?php

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Contracts\Debug\ExceptionHandler;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

$app = Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => RoleMiddleware::class,
        ]);

        // Ensure /api/* always negotiates JSON (no redirect-to-login behaviour).
        $middleware->api(prepend: [
            \Illuminate\Http\Middleware\HandleCors::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // no-op: the actual handler class is swapped via the singleton
        // binding below so every rule in App\Exceptions\Handler applies.
    })
    ->create();

// Laravel 11 instantiates its own default Handler internally. We override
// the ExceptionHandler contract binding so OUR Handler (with all the JSON
// envelope + JWT + validation rules) is the one actually used app-wide.
$app->singleton(ExceptionHandler::class, App\Exceptions\Handler::class);

return $app;
