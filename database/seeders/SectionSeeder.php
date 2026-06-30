<?php

namespace Database\Seeders;

use App\Models\Section;
use Illuminate\Database\Seeder;

class SectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = [
            ['name' => 'Login', 'slug' => 'login', 'icon' => 'log-in', 'description' => 'Login page designs — 50+ ready-to-use templates.'],
            ['name' => 'Logout', 'slug' => 'logout', 'icon' => 'log-out', 'description' => 'Logout confirmation screens and animations.'],
            ['name' => 'Animations', 'slug' => 'animations', 'icon' => 'sparkles', 'description' => 'Standalone CSS/JS animation snippets.'],
            ['name' => 'Cards', 'slug' => 'cards', 'icon' => 'credit-card', 'description' => 'Profile cards, product cards, pricing cards.'],
            ['name' => 'Buttons', 'slug' => 'buttons', 'icon' => 'mouse-pointer-click', 'description' => 'Buttons in every style — gradient, neon, 3D, glass.'],
            ['name' => 'Forms', 'slug' => 'forms', 'icon' => 'file-text', 'description' => 'Input fields, multi-step forms, validation styles.'],
            ['name' => 'Loaders', 'slug' => 'loaders', 'icon' => 'loader', 'description' => 'Spinners, skeletons, progress loaders.'],
            ['name' => 'Modals', 'slug' => 'modals', 'icon' => 'square', 'description' => 'Popups, dialogs, confirmation modals.'],
            ['name' => 'Search Bar', 'slug' => 'search-bar', 'icon' => 'search', 'description' => 'Search input designs with live suggestions UI.'],
            ['name' => 'Dark Mode Toggle', 'slug' => 'dark-mode-toggle', 'icon' => 'moon', 'description' => 'Switches and toggles for theme switching.'],
            ['name' => 'UI Components', 'slug' => 'ui-components', 'icon' => 'layout-grid', 'description' => 'Tabs, accordions, breadcrumbs, badges and more.'],
            ['name' => 'Mobile UI Components', 'slug' => 'mobile-ui-components', 'icon' => 'smartphone', 'description' => 'Bottom nav bars, mobile menus, app-style components.'],
            ['name' => 'Calendar', 'slug' => 'calendar', 'icon' => 'calendar', 'description' => 'Calendar layouts and event pickers.'],
            ['name' => 'Date Picker', 'slug' => 'date-picker', 'icon' => 'calendar-days', 'description' => 'Date and time picker components.'],
            ['name' => 'Dashboard UI Components', 'slug' => 'dashboard-ui-components', 'icon' => 'layout-dashboard', 'description' => 'Stat cards, charts containers, admin panel widgets.'],
            ['name' => 'Notifications / Toasts', 'slug' => 'notifications-toasts', 'icon' => 'bell', 'description' => 'Toast notifications, alert banners.'],
            ['name' => 'Popups', 'slug' => 'popups', 'icon' => 'message-square', 'description' => 'Newsletter popups, cookie consent, tooltips.'],
            ['name' => 'Contact Form', 'slug' => 'contact-form', 'icon' => 'mail', 'description' => 'Contact-us form layouts.'],
            ['name' => 'Header', 'slug' => 'header', 'icon' => 'panel-top', 'description' => 'Navbars and page headers.'],
            ['name' => 'Footer', 'slug' => 'footer', 'icon' => 'panel-bottom', 'description' => 'Footer layouts with links and socials.'],
        ];

        foreach ($sections as $index => $section) {
            Section::query()->updateOrCreate(
                ['slug' => $section['slug']],
                [
                    'name' => $section['name'],
                    'icon' => $section['icon'],
                    'description' => $section['description'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
