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
            'bio' => ['nullable', 'string', 'max:20000'],
            'location' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'profile_image_file' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,avif', 'max:5120'],
            'resume_file' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:10240'],
            'is_active' => ['required', 'boolean'],
        ];
    }
}
