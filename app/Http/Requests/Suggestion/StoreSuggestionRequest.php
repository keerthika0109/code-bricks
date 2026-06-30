<?php

namespace App\Http\Requests\Suggestion;

use Illuminate\Foundation\Http\FormRequest;

class StoreSuggestionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // works for both guests and logged-in users
    }

    public function rules(): array
    {
        $rules = [
            'subject' => ['required', 'string', 'max:150'],
            'message' => ['required', 'string', 'max:2000'],
        ];

        // If there's no authenticated user, name/email become required
        // so the super admin still knows who to respond to.
        if (!$this->user('api')) {
            $rules['name'] = ['required', 'string', 'max:100'];
            $rules['email'] = ['required', 'email', 'max:150'];
        } else {
            $rules['name'] = ['nullable', 'string', 'max:100'];
            $rules['email'] = ['nullable', 'email', 'max:150'];
        }

        return $rules;
    }
}
