<?php

namespace App\Services\Dashboard;

interface DashboardInterface
{
    /**
     * Aggregated stats for the super admin dashboard:
     * total users, new users this week, old users, unread suggestions,
     * pending reviews, total designs, total sections.
     */
    public function getAdminOverview(): array;
}
