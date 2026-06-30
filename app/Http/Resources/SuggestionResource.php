<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SuggestionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name ?? $this->user?->name,
            'email' => $this->email ?? $this->user?->email,
            'subject' => $this->subject,
            'message' => $this->message,
            'status' => $this->status,
            'is_from_registered_user' => (bool) $this->user_id,
            'created_at' => $this->created_at?->toIso8601String(),
        ];
    }
}
