<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsertContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'profile_id' => ['nullable', 'exists:profiles,id'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:30'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string'],
            'status' => ['required', 'string', 'max:255'],
            'read_at' => ['nullable', 'date'],
        ];
    }
}
