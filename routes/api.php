<?php

use App\Http\Controllers\Api\V1\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Api\V1\Admin\DesignController as AdminDesignController;
use App\Http\Controllers\Api\V1\Admin\ReviewController as AdminReviewController;
use App\Http\Controllers\Api\V1\Admin\SectionController as AdminSectionController;
use App\Http\Controllers\Api\V1\Admin\SuggestionController as AdminSuggestionController;
use App\Http\Controllers\Api\V1\Admin\UserController as AdminUserController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\DesignController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\SectionController;
use App\Http\Controllers\Api\V1\SuggestionController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Api\V1\WishlistController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — CodeBricks
|--------------------------------------------------------------------------
|
| ALL routes below are prefixed with /api (see bootstrap/app.php) and
| versioned under /v1. Every single route in this project is declared
| HERE and nowhere else — controllers contain NO route definitions,
| so this file is always the complete, authoritative map of the API.
|
| Base URL when testing locally in Postman: http://localhost:8000/api/v1
|
| Every response (success or error) follows the same JSON envelope —
| see app/Helpers/ApiResponse.php and app/Exceptions/Handler.php.
|
*/

Route::prefix('v1')->group(function () {

    /*
    |----------------------------------------------------------------
    | PUBLIC — Authentication
    |----------------------------------------------------------------
    */
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']); // POST /api/v1/auth/register
        Route::post('login', [AuthController::class, 'login']);       // POST /api/v1/auth/login
        Route::post('verify-otp', [AuthController::class, 'verifyOtp']);

        Route::middleware('auth:api')->group(function () {
            Route::post('logout', [AuthController::class, 'logout']);   // POST /api/v1/auth/logout
            Route::post('refresh', [AuthController::class, 'refresh']); // POST /api/v1/auth/refresh
            Route::get('me', [AuthController::class, 'me']);            // GET  /api/v1/auth/me
        });
    });

    /*
    |----------------------------------------------------------------
    | PUBLIC — Sections (sidebar) & Designs (browse, view code, preview, download)
    | No login required to browse and copy code — beginners can learn freely.
    |----------------------------------------------------------------
    */
    Route::get('sections', [SectionController::class, 'index']);             // GET /api/v1/sections
    Route::get('sections/{slug}', [SectionController::class, 'show']);       // GET /api/v1/sections/login

    Route::get('designs', [DesignController::class, 'index']);                       // GET  /api/v1/designs?section_slug=login
    Route::get('designs/{id}', [DesignController::class, 'show']);                    // GET  /api/v1/designs/12
    Route::post('designs/{id}/preview', [DesignController::class, 'preview']);        // POST /api/v1/designs/12/preview
    Route::post('designs/{id}/download', [DesignController::class, 'download']);      // POST /api/v1/designs/12/download
    Route::get('designs/{id}/reviews', [ReviewController::class, 'forDesign']);       // GET  /api/v1/designs/12/reviews

    /*
    |----------------------------------------------------------------
    | PUBLIC — Contact / Suggestions form
    | Works for guests too; if a valid Bearer token is sent it's linked
    | to that user automatically (see SuggestionController).
    |----------------------------------------------------------------
    */
    Route::post('suggestions', [SuggestionController::class, 'store']); // POST /api/v1/suggestions
    /*
    |----------------------------------------------------------------
    | AUTHENTICATED — any logged-in user (role: user OR super_admin)
    |----------------------------------------------------------------
    */
    Route::middleware('auth:api')->group(function () {

        Route::get('profile', [UserController::class, 'show']);   // GET /api/v1/profile
        Route::put('profile', [UserController::class, 'update']); // PUT /api/v1/profile

        Route::get('wishlist', [WishlistController::class, 'index']);                  // GET    /api/v1/wishlist
        Route::post('wishlist', [WishlistController::class, 'store']);                 // POST   /api/v1/wishlist
        Route::delete('wishlist/{designId}', [WishlistController::class, 'destroy']);  // DELETE /api/v1/wishlist/12
        Route::post('wishlist/{designId}/toggle', [WishlistController::class, 'toggle']); // POST /api/v1/wishlist/12/toggle

        Route::post('reviews', [ReviewController::class, 'store']); // POST /api/v1/reviews
        Route::get('reviews/mine', [ReviewController::class, 'mine']); // GET /api/v1/reviews/mine
        // Route::post('verify-otp', [AuthController::class, 'verifyOtp']); // POST /api/v1/auth/verify-otp
    });

    /*
    |----------------------------------------------------------------
    | SUPER ADMIN ONLY — /api/v1/admin/*
    | Requires auth:api AND role:super_admin (both middlewares run in order).
    |----------------------------------------------------------------
    */
    Route::prefix('admin')->middleware(['auth:api', 'role:super_admin'])->group(function () {

        Route::get('dashboard', [AdminDashboardController::class, 'overview']); // GET /api/v1/admin/dashboard

        // Users
        Route::get('users', [AdminUserController::class, 'index']);                    // GET    /api/v1/admin/users
        Route::get('users/stats', [AdminUserController::class, 'stats']);               // GET    /api/v1/admin/users/stats
        Route::get('users/{id}', [AdminUserController::class, 'show']);                 // GET    /api/v1/admin/users/12
        Route::patch('users/{id}/activate', [AdminUserController::class, 'activate']);  // PATCH  /api/v1/admin/users/12/activate
        Route::patch('users/{id}/deactivate', [AdminUserController::class, 'deactivate']); // PATCH /api/v1/admin/users/12/deactivate
        Route::delete('users/{id}', [AdminUserController::class, 'destroy']);           // DELETE /api/v1/admin/users/12

        // Sections (sidebar management)
        Route::get('sections', [AdminSectionController::class, 'index']);     // GET    /api/v1/admin/sections
        Route::post('sections', [AdminSectionController::class, 'store']);    // POST   /api/v1/admin/sections
        Route::put('sections/{id}', [AdminSectionController::class, 'update']); // PUT  /api/v1/admin/sections/3
        Route::delete('sections/{id}', [AdminSectionController::class, 'destroy']); // DELETE /api/v1/admin/sections/3

        // Designs (add new login designs, edit code, unpublish, delete)
        Route::post('designs', [AdminDesignController::class, 'store']);                  // POST /api/v1/admin/designs
        Route::put('designs/{id}/meta', [AdminDesignController::class, 'updateMeta']);     // PUT  /api/v1/admin/designs/12/meta
        Route::put('designs/{id}/files', [AdminDesignController::class, 'updateFiles']);   // PUT  /api/v1/admin/designs/12/files
        Route::delete('designs/{id}', [AdminDesignController::class, 'destroy']);          // DELETE /api/v1/admin/designs/12

        // Reviews moderation
        Route::get('reviews', [AdminReviewController::class, 'index']);                 // GET   /api/v1/admin/reviews?status=pending
        Route::patch('reviews/{id}/approve', [AdminReviewController::class, 'approve']); // PATCH /api/v1/admin/reviews/5/approve
        Route::patch('reviews/{id}/reject', [AdminReviewController::class, 'reject']);   // PATCH /api/v1/admin/reviews/5/reject
        Route::delete('reviews/{id}', [AdminReviewController::class, 'destroy']);        // DELETE /api/v1/admin/reviews/5

        // Suggestions inbox
        Route::get('suggestions', [AdminSuggestionController::class, 'index']);                 // GET   /api/v1/admin/suggestions
        Route::patch('suggestions/{id}/read', [AdminSuggestionController::class, 'markRead']);   // PATCH /api/v1/admin/suggestions/9/read
        Route::patch('suggestions/{id}/resolve', [AdminSuggestionController::class, 'markResolved']); // PATCH /api/v1/admin/suggestions/9/resolve
        Route::delete('suggestions/{id}', [AdminSuggestionController::class, 'destroy']);        // DELETE /api/v1/admin/suggestions/9
    });
});
