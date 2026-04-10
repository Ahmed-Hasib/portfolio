<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertSkillRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'proficiency_percentage' => ['nullable', 'integer', 'min:0', 'max:100'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
