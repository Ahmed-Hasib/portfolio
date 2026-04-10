@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Manage project metadata, descriptions, links, featured state, and technology stack.';
@endphp

@section('content')
    <form method="POST" action="{{ $formAction }}" class="surface-card space-y-5 px-6 py-6">
        @csrf
        @if ($formMethod !== 'POST') @method($formMethod) @endif

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Profile</span>
                <select name="profile_id" class="admin-select" required>
                    <option value="">Select a profile</option>
                    @foreach ($profiles as $profile)
                        <option value="{{ $profile->id }}" @selected((string) old('profile_id', $project->profile_id) === (string) $profile->id)>{{ $profile->full_name }}</option>
                    @endforeach
                </select>
            </label>
            <label>
                <span class="admin-label">Project title</span>
                <input type="text" name="title" value="{{ old('title', $project->title) }}" class="admin-input" required>
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Slug</span>
                <input type="text" name="slug" value="{{ old('slug', $project->slug) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Category</span>
                <input type="text" name="category" value="{{ old('category', $project->category) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Role</span>
                <input type="text" name="role" value="{{ old('role', $project->role) }}" class="admin-input">
            </label>
        </div>

        <label>
            <span class="admin-label">Thumbnail path or URL</span>
            <input type="text" name="thumbnail" value="{{ old('thumbnail', $project->thumbnail) }}" class="admin-input">
        </label>

        <div class="grid gap-5 lg:grid-cols-2">
            <label>
                <span class="admin-label">Short description</span>
                <textarea name="description" class="admin-textarea" required>{{ old('description', $project->description) }}</textarea>
            </label>
            <label>
                <span class="admin-label">Full description</span>
                <textarea name="full_description" class="admin-textarea">{{ old('full_description', $project->full_description) }}</textarea>
            </label>
        </div>

        <div class="grid gap-5 lg:grid-cols-3">
            <label>
                <span class="admin-label">Technology stack</span>
                <textarea name="tech_stack" class="admin-textarea">{{ old('tech_stack', $techStackText) }}</textarea>
                <span class="mt-2 block text-xs text-ink-soft">One technology per line.</span>
            </label>
            <label>
                <span class="admin-label">Live URL</span>
                <input type="url" name="live_url" value="{{ old('live_url', $project->live_url) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">GitHub URL</span>
                <input type="url" name="github_url" value="{{ old('github_url', $project->github_url) }}" class="admin-input">
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Sort order</span>
                <input type="number" name="sort_order" value="{{ old('sort_order', $project->sort_order ?? 0) }}" class="admin-input" min="0">
            </label>
            <label class="flex items-center gap-3 pt-8 text-sm font-semibold text-ink">
                <input type="checkbox" name="featured" value="1" {{ old('featured', $project->featured) ? 'checked' : '' }}>
                <span>Mark as featured project</span>
            </label>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.projects.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>
@endsection
