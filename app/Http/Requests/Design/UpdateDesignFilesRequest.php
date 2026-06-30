<?php

namespace App\Http\Requests\Design;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDesignFilesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'html' => ['sometimes', 'string'],
            'css' => ['sometimes', 'nullable', 'string'],
            'js' => ['sometimes', 'nullable', 'string'],
        ];
    }
}
