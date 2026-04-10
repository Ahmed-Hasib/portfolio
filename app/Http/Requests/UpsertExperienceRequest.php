<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertExperienceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_current' => $this->boolean('is_current'),
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
            'company_name' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'employment_type' => ['nullable', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date'],
            'is_current' => ['required', 'boolean'],
            'summary' => ['nullable', 'string'],
            'technologies_used' => ['nullable', 'string'],
            'achievements' => ['nullable', 'string'],
            'job_descriptions' => ['nullable', 'string'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
