<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertEducationRequest extends FormRequest
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
            'institute' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'field' => ['nullable', 'string', 'max:255'],
            'start_year' => ['required', 'integer', 'min:1900', 'max:2100'],
            'end_year' => ['nullable', 'integer', 'min:1900', 'max:2100'],
            'grade' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
