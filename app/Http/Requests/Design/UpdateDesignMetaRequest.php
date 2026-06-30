<?php

namespace App\Http\Requests\Design;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDesignMetaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'string', 'max:150'],
            'description' => ['sometimes', 'nullable', 'string', 'max:1000'],
            'thumbnail' => ['sometimes', 'nullable', 'string'],
            'customizable_vars' => ['sometimes', 'nullable', 'array'],
            'tags' => ['sometimes', 'nullable', 'array'],
            'is_published' => ['sometimes', 'boolean'],
        ];
    }
}
