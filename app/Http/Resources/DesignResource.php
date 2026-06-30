<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DesignResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'section' => $this->whenLoaded('section', fn () => [
                'id' => $this->section->id,
                'name' => $this->section->name,
                'slug' => $this->section->slug,
            ]),
            'customizable_vars' => $this->customizable_vars,
            'tags' => $this->tags,
            'views_count' => $this->views_count,
            'downloads_count' => $this->downloads_count,
            'is_published' => $this->is_published,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
