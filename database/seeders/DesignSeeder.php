<?php

namespace Database\Seeders;

use Database\Seeders\Designs\AnimationsDesignSeeder;
use Database\Seeders\Designs\ButtonsDesignSeeder;
use Database\Seeders\Designs\CalendarDesignSeeder;
use Database\Seeders\Designs\CardsDesignSeeder;
use Database\Seeders\Designs\ContactFormDesignSeeder;
use Database\Seeders\Designs\DarkModeToggleDesignSeeder;
use Database\Seeders\Designs\DashboardUiComponentsDesignSeeder;
use Database\Seeders\Designs\DatePickerDesignSeeder;
use Database\Seeders\Designs\FooterDesignSeeder;
use Database\Seeders\Designs\FormsDesignSeeder;
use Database\Seeders\Designs\HeaderDesignSeeder;
use Database\Seeders\Designs\LoadersDesignSeeder;
use Database\Seeders\Designs\LoginDesignSeeder;
use Database\Seeders\Designs\LogoutDesignSeeder;
use Database\Seeders\Designs\MobileUiComponentsDesignSeeder;
use Database\Seeders\Designs\ModalsDesignSeeder;
use Database\Seeders\Designs\NotificationsToastsDesignSeeder;
use Database\Seeders\Designs\PopupsDesignSeeder;
use Database\Seeders\Designs\SearchBarDesignSeeder;
use Database\Seeders\Designs\UiComponentsDesignSeeder;
use Illuminate\Database\Seeder;

/**
 * Dispatches to one seeder class per section (see database/seeders/Designs/).
 * Each section's designs live in their own file because every section has
 * 30+ designs — keeping them in one giant array here would make this file
 * unmaintainable.
 *
 * ALL 20 SECTIONS COMPLETE — 600 designs total, 30 per section.
 */
class DesignSeeder extends Seeder
{
    public function run(): void
    {
        $seeders = [
            LoginDesignSeeder::class,
            LogoutDesignSeeder::class,
            AnimationsDesignSeeder::class,
            CardsDesignSeeder::class,
            ButtonsDesignSeeder::class,
            FormsDesignSeeder::class,
            LoadersDesignSeeder::class,
            ModalsDesignSeeder::class,
            SearchBarDesignSeeder::class,
            DarkModeToggleDesignSeeder::class,
            UiComponentsDesignSeeder::class,
            MobileUiComponentsDesignSeeder::class,
            CalendarDesignSeeder::class,
            DatePickerDesignSeeder::class,
            DashboardUiComponentsDesignSeeder::class,
            NotificationsToastsDesignSeeder::class,
            PopupsDesignSeeder::class,
            ContactFormDesignSeeder::class,
            HeaderDesignSeeder::class,
            FooterDesignSeeder::class,
        ];

        $this->call($seeders);
    }
}
