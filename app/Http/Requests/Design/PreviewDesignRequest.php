<?php

namespace App\Http\Requests\Design;

use Illuminate\Foundation\Http\FormRequest;

class PreviewDesignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'overrides' => ['nullable', 'array'],
            'overrides.*' => ['nullable', 'string', 'max:100'],
        ];
    }
}
