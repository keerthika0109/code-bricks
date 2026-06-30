<?php

namespace App\Services\Dashboard;

use App\Models\Review;
use App\Repositories\Design\DesignContract;
use App\Repositories\Review\ReviewContract;
use App\Repositories\Section\SectionContract;
use App\Repositories\Suggestion\SuggestionContract;
use App\Repositories\User\UserContract;
use Illuminate\Support\Carbon;

class DashboardService implements DashboardInterface
{
    public function __construct(
        protected UserContract $userRepository,
        protected SuggestionContract $suggestionRepository,
        protected ReviewContract $reviewRepository,
        protected DesignContract $designRepository,
        protected SectionContract $sectionRepository
    ) {
    }

    public function getAdminOverview(): array
    {
        $weekAgo = Carbon::now()->subDays(7);

        $newUsers = $this->userRepository->getUsersRegisteredSince($weekAgo);
        $oldUsers = $this->userRepository->getUsersRegisteredBefore($weekAgo);

        $pendingReviews = $this->reviewRepository->paginateAll(5, Review::STATUS_PENDING);

        return [
            'total_users' => $this->userRepository->countAllNormalUsers(),
            'new_users_this_week' => $newUsers->count(),
            'old_users_count' => $oldUsers->count(),
            'new_users' => $newUsers->take(10)->values(),
            'unread_suggestions_count' => $this->suggestionRepository->countUnread(),
            'pending_reviews_count' => $pendingReviews->total(),
            'recent_pending_reviews' => $pendingReviews->items(),
            'total_designs' => $this->designRepository->all()->count(),
            'total_sections' => $this->sectionRepository->all()->count(),
        ];
    }
}
