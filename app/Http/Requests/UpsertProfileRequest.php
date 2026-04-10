<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'designation' => ['required', 'string', 'max:255'],
            'bio' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'profile_image' => ['nullable', 'string', 'max:2048'],
            'resume_url' => ['nullable', 'string', 'max:2048'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
