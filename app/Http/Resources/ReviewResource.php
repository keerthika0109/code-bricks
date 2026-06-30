<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'status' => $this->status,
            'user' => $this->whenLoaded('user', fn () => [
                'id' => $this->user->id,
                'name' => $this->user->name,
                'avatar' => $this->user->avatar,
            ]),
            'design' => $this->whenLoaded('design', fn () => $this->design ? [
                'id' => $this->design->id,
                'title' => $this->design->title,
            ] : null),
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
