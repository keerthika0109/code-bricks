<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Design extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'created_by',
        'title',
        'slug',
        'description',
        'thumbnail',
        'storage_path',
        'customizable_vars',
        'tags',
        'views_count',
        'downloads_count',
        'is_published',
    ];

    protected function casts(): array
    {
        return [
            'customizable_vars' => 'array',
            'tags' => 'array',
            'is_published' => 'boolean',
        ];
    }

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function wishlistedBy()
    {
        return $this->hasMany(Wishlist::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Absolute disk path to this design's snippet folder, e.g.:
     * /var/www/storage/app/snippets/login/glassmorphic-card-01
     */
    public function getSnippetDirectory(): string
    {
        return Storage::disk('snippets')->path($this->storage_path);
    }

    public function getHtmlPath(): string
    {
        return $this->getSnippetDirectory() . '/index.html';
    }

    public function getCssPath(): string
    {
        return $this->getSnippetDirectory() . '/style.css';
    }

    public function getJsPath(): string
    {
        return $this->getSnippetDirectory() . '/script.js';
    }
}
