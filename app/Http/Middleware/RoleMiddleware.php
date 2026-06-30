<?php

namespace App\Http\Middleware;

use App\Exceptions\ForbiddenException;
use Closure;
use Illuminate\Http\Request;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Symfony\Component\HttpFoundation\Response;

/**
 * Usage in routes: ->middleware('role:super_admin')
 * Must run AFTER the 'auth:api' middleware in the route group.
 */
class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = JWTAuth::user();

        if (!$user || !in_array($user->role, $roles, true)) {
            throw new ForbiddenException('You do not have permission to access this resource.');
        }

        return $next($request);
    }
}
