<?php

namespace App\Http\Requests\Design;

use Illuminate\Foundation\Http\FormRequest;

class StoreDesignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // gated by 'super_admin' route middleware, not here
    }

    public function rules(): array
    {
        return [
            'section_id' => ['required', 'integer', 'exists:sections,id'],
            'section_slug' => ['required', 'string', 'exists:sections,slug'],
            'title' => ['required', 'string', 'max:150'],
            'slug' => ['nullable', 'string', 'max:150'],
            'description' => ['nullable', 'string', 'max:1000'],
            'thumbnail' => ['nullable', 'string'],
            'html' => ['required', 'string'],
            'css' => ['nullable', 'string'],
            'js' => ['nullable', 'string'],
            'customizable_vars' => ['nullable', 'array'],
            'tags' => ['nullable', 'array'],
            'is_published' => ['nullable', 'boolean'],
        ];
    }
}
