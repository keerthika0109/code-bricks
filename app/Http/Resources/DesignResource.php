<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class DesignResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // Load snippet files inline so the frontend can render a live
        // scaled-down iframe thumbnail without a separate API call.
        $snippetHtml = null;
        $snippetCss  = null;
        try {
            $disk = Storage::disk('snippets');
            $base = $this->storage_path;
            if ($disk->exists("{$base}/index.html")) {
                $snippetHtml = $disk->get("{$base}/index.html");
                $snippetCss  = $disk->exists("{$base}/style.css")
                    ? $disk->get("{$base}/style.css")
                    : '';
            }
        } catch (\Throwable) {
            // Snippet files missing — frontend falls back to a placeholder.
        }

        return [
            'id'               => $this->id,
            'title'            => $this->title,
            'slug'             => $this->slug,
            'description'      => $this->description,
            'thumbnail'        => $this->thumbnail,
            // Inline snippet code for card thumbnails (html + css only; no JS needed for static preview)
            'snippet_html'     => $snippetHtml,
            'snippet_css'      => $snippetCss,
            'section'          => $this->whenLoaded('section', fn () => [
                'id'   => $this->section->id,
                'name' => $this->section->name,
                'slug' => $this->section->slug,
            ]),
            'customizable_vars' => $this->customizable_vars,
            'tags'              => $this->tags,
            'views_count'       => $this->views_count,
            'downloads_count'   => $this->downloads_count,
            'is_published'      => $this->is_published,
            'created_at'        => $this->created_at?->toIso8601String(),
        ];
    }
}