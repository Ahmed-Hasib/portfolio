@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Create or update skills shown in the portfolio resume section.';
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
                        <option value="{{ $profile->id }}" @selected((string) old('profile_id', $skill->profile_id) === (string) $profile->id)>{{ $profile->full_name }}</option>
                    @endforeach
                </select>
            </label>
            <label>
                <span class="admin-label">Skill name</span>
                <input type="text" name="name" value="{{ old('name', $skill->name) }}" class="admin-input" required>
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Category</span>
                <input type="text" name="category" value="{{ old('category', $skill->category) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Icon key</span>
                <input type="text" name="icon" value="{{ old('icon', $skill->icon) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Proficiency percentage</span>
                <input type="number" name="proficiency_percentage" value="{{ old('proficiency_percentage', $skill->proficiency_percentage) }}" class="admin-input" min="0" max="100">
            </label>
        </div>

        <label>
            <span class="admin-label">Sort order</span>
            <input type="number" name="sort_order" value="{{ old('sort_order', $skill->sort_order ?? 0) }}" class="admin-input" min="0">
        </label>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.skills.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>
@endsection
