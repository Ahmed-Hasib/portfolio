@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Create or update the main public profile that powers the portfolio frontend.';
@endphp

@section('content')
    <form method="POST" action="{{ $formAction }}" class="surface-card space-y-5 px-6 py-6">
        @csrf
        @if ($formMethod !== 'POST')
            @method($formMethod)
        @endif

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Full name</span>
                <input type="text" name="full_name" value="{{ old('full_name', $profile->full_name) }}" class="admin-input" required>
                @error('full_name') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
            </label>

            <label>
                <span class="admin-label">Designation</span>
                <input type="text" name="designation" value="{{ old('designation', $profile->designation) }}" class="admin-input" required>
                @error('designation') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
            </label>
        </div>

        <label>
            <span class="admin-label">Bio</span>
            <textarea name="bio" class="admin-textarea">{{ old('bio', $profile->bio) }}</textarea>
            @error('bio') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
        </label>

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Location</span>
                <input type="text" name="location" value="{{ old('location', $profile->location) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Email</span>
                <input type="email" name="email" value="{{ old('email', $profile->email) }}" class="admin-input">
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Phone</span>
                <input type="text" name="phone" value="{{ old('phone', $profile->phone) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Profile image path or URL</span>
                <input type="text" name="profile_image" value="{{ old('profile_image', $profile->profile_image) }}" class="admin-input">
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Resume URL</span>
                <input type="text" name="resume_url" value="{{ old('resume_url', $profile->resume_url) }}" class="admin-input">
            </label>
            <label class="flex items-center gap-3 pt-8 text-sm font-semibold text-ink">
                <input type="checkbox" name="is_active" value="1" {{ old('is_active', $profile->is_active) ? 'checked' : '' }}>
                <span>Set as active public profile</span>
            </label>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.profiles.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>
@endsection
