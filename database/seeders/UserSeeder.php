<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // --- The Super Admin account (as specified by the project owner) ---
        User::query()->updateOrCreate(
            ['email' => 'rohit@xyz.com'],
            [
                'name' => 'Rohit',
                'password' => Hash::make('Pass@word1'),
                'role' => User::ROLE_SUPER_ADMIN,
                'email_verified_at' => now(),
                'is_active' => true,
            ]
        );

        // --- Sample "new" users (registered within the last 7 days) ---
        // so the dashboard's "new users this week" card has real data to show.
        $newUserSeeds = [
            ['name' => 'Aarav Sharma', 'email' => 'aarav@example.com', 'days_ago' => 1],
            ['name' => 'Priya Singh', 'email' => 'priya@example.com', 'days_ago' => 2],
            ['name' => 'Karthik Iyer', 'email' => 'karthik@example.com', 'days_ago' => 4],
        ];

        foreach ($newUserSeeds as $seed) {
            User::query()->updateOrCreate(
                ['email' => $seed['email']],
                [
                    'name' => $seed['name'],
                    'password' => Hash::make('password'),
                    'role' => User::ROLE_USER,
                    'email_verified_at' => now(),
                    'is_active' => true,
                    'created_at' => now()->subDays($seed['days_ago']),
                    'updated_at' => now()->subDays($seed['days_ago']),
                ]
            );
        }

        // --- Sample "old" users (registered more than 7 days ago) ---
        $oldUserSeeds = [
            ['name' => 'Meena Pillai', 'email' => 'meena@example.com', 'days_ago' => 30],
            ['name' => 'Ravi Verma', 'email' => 'ravi@example.com', 'days_ago' => 60],
        ];

        foreach ($oldUserSeeds as $seed) {
            User::query()->updateOrCreate(
                ['email' => $seed['email']],
                [
                    'name' => $seed['name'],
                    'password' => Hash::make('password'),
                    'role' => User::ROLE_USER,
                    'email_verified_at' => now(),
                    'is_active' => true,
                    'created_at' => now()->subDays($seed['days_ago']),
                    'updated_at' => now()->subDays($seed['days_ago']),
                ]
            );
        }
    }
}
