<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('designs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('section_id')->constrained('sections')->cascadeOnDelete();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('title');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('thumbnail')->nullable()->comment('relative path under storage/app/public for the preview thumbnail');

            // Where the actual index.html / style.css / script.js live on disk,
            // relative to storage/app/snippets/. e.g. "login/glassmorphic-card-01"
            $table->string('storage_path')->unique();

            // Which CSS custom properties this design exposes to the customizer,
            // e.g. {"--primary-color": "#6366f1", "--border-radius": "12px", "--font-family": "Inter"}
            $table->json('customizable_vars')->nullable();

            $table->json('tags')->nullable()->comment('e.g. ["dark-mode","glassmorphism","responsive"]');
            $table->unsignedInteger('views_count')->default(0);
            $table->unsignedInteger('downloads_count')->default(0);
            $table->boolean('is_published')->default(true);
            $table->timestamps();

            $table->unique(['section_id', 'slug']);
            $table->index(['section_id', 'is_published']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('designs');
    }
};
