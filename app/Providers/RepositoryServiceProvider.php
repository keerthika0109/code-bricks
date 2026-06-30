<?php

namespace App\Providers;

use App\Repositories\Design\DesignContract;
use App\Repositories\Design\DesignEloquent;
use App\Repositories\Review\ReviewContract;
use App\Repositories\Review\ReviewEloquent;
use App\Repositories\Section\SectionContract;
use App\Repositories\Section\SectionEloquent;
use App\Repositories\Suggestion\SuggestionContract;
use App\Repositories\Suggestion\SuggestionEloquent;
use App\Repositories\User\UserContract;
use App\Repositories\User\UserEloquent;
use App\Repositories\Wishlist\WishlistContract;
use App\Repositories\Wishlist\WishlistEloquent;
use Illuminate\Support\ServiceProvider;

/**
 * Binds every {Module}Contract interface to its {Module}Eloquent
 * implementation. This is the ONLY place repository wiring happens —
 * services type-hint the Contract interface in their constructors and
 * Laravel's container resolves the concrete Eloquent class from here.
 *
 * Add a new module? Add ONE line here. Nothing else in the app needs
 * to know which concrete class is behind the interface.
 */
class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(UserContract::class, UserEloquent::class);
        $this->app->bind(SectionContract::class, SectionEloquent::class);
        $this->app->bind(DesignContract::class, DesignEloquent::class);
        $this->app->bind(WishlistContract::class, WishlistEloquent::class);
        $this->app->bind(ReviewContract::class, ReviewEloquent::class);
        $this->app->bind(SuggestionContract::class, SuggestionEloquent::class);
    }
}
