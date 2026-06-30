<?php

namespace Database\Factories;

use App\Models\Design;
use App\Models\Section;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class DesignFactory extends Factory
{
    protected $model = Design::class;

    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'section_id' => Section::factory(),
            'created_by' => null,
            'title' => ucwords($title),
            'slug' => Str::slug($title),
            'description' => fake()->sentence(),
            'thumbnail' => null,
            'storage_path' => 'test/' . Str::slug($title),
            'customizable_vars' => ['--primary-color' => '#6366f1'],
            'tags' => ['test'],
            'views_count' => 0,
            'downloads_count' => 0,
            'is_published' => true,
        ];
    }
}
