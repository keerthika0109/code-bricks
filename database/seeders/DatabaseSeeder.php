<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,      // super admin + sample users
            SectionSeeder::class,   // sidebar categories (login, buttons, cards...)
            DesignSeeder::class,    // sample designs registered against their disk files
        ]);
    }
}
