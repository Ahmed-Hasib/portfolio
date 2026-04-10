<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertSocialLinkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'display_order' => $this->filled('display_order')
                ? $this->input('display_order')
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
            'platform_name' => ['required', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'url' => ['required', 'string', 'max:2048'],
            'display_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
