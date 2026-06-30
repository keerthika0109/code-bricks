<?php

namespace App\Providers;

use App\Services\Auth\AuthInterface;
use App\Services\Auth\AuthService;
use App\Services\Dashboard\DashboardInterface;
use App\Services\Dashboard\DashboardService;
use App\Services\Design\DesignInterface;
use App\Services\Design\DesignService;
use App\Services\Review\ReviewInterface;
use App\Services\Review\ReviewService;
use App\Services\Section\SectionInterface;
use App\Services\Section\SectionService;
use App\Services\Snippet\SnippetInterface;
use App\Services\Snippet\SnippetService;
use App\Services\Suggestion\SuggestionInterface;
use App\Services\Suggestion\SuggestionService;
use App\Services\User\UserInterface;
use App\Services\User\UserService;
use App\Services\Wishlist\WishlistInterface;
use App\Services\Wishlist\WishlistService;
use Illuminate\Support\ServiceProvider;

/**
 * Binds every {Module}Interface to its {Module}Service implementation.
 * Controllers type-hint the Interface in their constructors; this is
 * the only place that decides which concrete Service class backs it.
 */
class ServiceServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AuthInterface::class, AuthService::class);
        $this->app->bind(UserInterface::class, UserService::class);
        $this->app->bind(SectionInterface::class, SectionService::class);
        $this->app->bind(SnippetInterface::class, SnippetService::class);
        $this->app->bind(DesignInterface::class, DesignService::class);
        $this->app->bind(WishlistInterface::class, WishlistService::class);
        $this->app->bind(ReviewInterface::class, ReviewService::class);
        $this->app->bind(SuggestionInterface::class, SuggestionService::class);
        $this->app->bind(DashboardInterface::class, DashboardService::class);
    }
}
