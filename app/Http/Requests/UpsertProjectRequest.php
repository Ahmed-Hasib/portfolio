<?php

namespace App\Http\Requests;

use App\Models\Project;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpsertProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $slug = $this->input('slug');

        $this->merge([
            'slug' => filled($slug) ? Str::slug((string) $slug) : Str::slug((string) $this->input('title')),
            'featured' => $this->boolean('featured'),
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
        /** @var Project|null $project */
        $project = $this->route('project');

        return [
            'profile_id' => ['required', 'exists:profiles,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => [
                'required',
                'string',
                'max:255',
                Rule::unique('projects', 'slug')->ignore($project?->id),
            ],
            'thumbnail' => ['nullable', 'string', 'max:2048'],
            'description' => ['required', 'string'],
            'full_description' => ['nullable', 'string'],
            'category' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'tech_stack' => ['nullable', 'string'],
            'live_url' => ['nullable', 'url', 'max:2048'],
            'github_url' => ['nullable', 'url', 'max:2048'],
            'featured' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
