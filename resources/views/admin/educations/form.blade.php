@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Create or update education records that support the public resume section.';
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
                        <option value="{{ $profile->id }}" @selected((string) old('profile_id', $education->profile_id) === (string) $profile->id)>{{ $profile->full_name }}</option>
                    @endforeach
                </select>
            </label>
            <label>
                <span class="admin-label">Institute</span>
                <input type="text" name="institute" value="{{ old('institute', $education->institute) }}" class="admin-input" required>
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Degree</span>
                <input type="text" name="degree" value="{{ old('degree', $education->degree) }}" class="admin-input" required>
            </label>
            <label>
                <span class="admin-label">Field</span>
                <input type="text" name="field" value="{{ old('field', $education->field) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Grade / note</span>
                <input type="text" name="grade" value="{{ old('grade', $education->grade) }}" class="admin-input">
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Start year</span>
                <input type="number" name="start_year" value="{{ old('start_year', $education->start_year) }}" class="admin-input" min="1900" max="2100" required>
            </label>
            <label>
                <span class="admin-label">End year</span>
                <input type="number" name="end_year" value="{{ old('end_year', $education->end_year) }}" class="admin-input" min="1900" max="2100">
            </label>
            <label>
                <span class="admin-label">Sort order</span>
                <input type="number" name="sort_order" value="{{ old('sort_order', $education->sort_order ?? 0) }}" class="admin-input" min="0">
            </label>
        </div>

        <label>
            <span class="admin-label">Summary</span>
            <textarea name="summary" class="admin-textarea">{{ old('summary', $education->summary) }}</textarea>
        </label>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.educations.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>
@endsection
