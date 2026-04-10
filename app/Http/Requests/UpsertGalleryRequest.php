<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertGalleryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'sort_order' => $this->filled('sort_order')
                ? $this->input('sort_order')
                : 0,
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'profile_id' => ['required', 'exists:profiles,id'],
            'image' => ['required', 'string', 'max:2048'],
            'title' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
