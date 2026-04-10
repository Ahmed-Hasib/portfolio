@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Manage work history, achievements, technologies, and bullet responsibilities using one line per item where noted.';
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
                        <option value="{{ $profile->id }}" @selected((string) old('profile_id', $experience->profile_id) === (string) $profile->id)>{{ $profile->full_name }}</option>
                    @endforeach
                </select>
            </label>
            <label>
                <span class="admin-label">Company name</span>
                <input type="text" name="company_name" value="{{ old('company_name', $experience->company_name) }}" class="admin-input" required>
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Role</span>
                <input type="text" name="role" value="{{ old('role', $experience->role) }}" class="admin-input" required>
            </label>
            <label>
                <span class="admin-label">Employment type</span>
                <input type="text" name="employment_type" value="{{ old('employment_type', $experience->employment_type) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Location</span>
                <input type="text" name="location" value="{{ old('location', $experience->location) }}" class="admin-input">
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Start date</span>
                <input type="date" name="start_date" value="{{ old('start_date', $experience->start_date?->format('Y-m-d')) }}" class="admin-input" required>
            </label>
            <label>
                <span class="admin-label">End date</span>
                <input type="date" name="end_date" value="{{ old('end_date', $experience->end_date?->format('Y-m-d')) }}" class="admin-input">
            </label>
            <label class="flex items-center gap-3 pt-8 text-sm font-semibold text-ink">
                <input type="checkbox" name="is_current" value="1" {{ old('is_current', $experience->is_current) ? 'checked' : '' }}>
                <span>Currently active role</span>
            </label>
        </div>

        <label>
            <span class="admin-label">Summary</span>
            <textarea name="summary" class="admin-textarea">{{ old('summary', $experience->summary) }}</textarea>
        </label>

        <div class="grid gap-5 lg:grid-cols-3">
            <label>
                <span class="admin-label">Technologies used</span>
                <textarea name="technologies_used" class="admin-textarea">{{ old('technologies_used', $technologiesText) }}</textarea>
                <span class="mt-2 block text-xs text-ink-soft">One technology per line.</span>
            </label>
            <label>
                <span class="admin-label">Achievements</span>
                <textarea name="achievements" class="admin-textarea">{{ old('achievements', $achievementsText) }}</textarea>
                <span class="mt-2 block text-xs text-ink-soft">One achievement per line.</span>
            </label>
            <label>
                <span class="admin-label">Job descriptions</span>
                <textarea name="job_descriptions" class="admin-textarea">{{ old('job_descriptions', $jobDescriptionsText) }}</textarea>
                <span class="mt-2 block text-xs text-ink-soft">One responsibility per line.</span>
            </label>
        </div>

        <label>
            <span class="admin-label">Sort order</span>
            <input type="number" name="sort_order" value="{{ old('sort_order', $experience->sort_order ?? 0) }}" class="admin-input" min="0">
        </label>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.experiences.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>
@endsection
