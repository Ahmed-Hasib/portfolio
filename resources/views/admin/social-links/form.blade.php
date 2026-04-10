@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Create or update the public social channels shown throughout the portfolio.';
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
                        <option value="{{ $profile->id }}" @selected((string) old('profile_id', $socialLink->profile_id) === (string) $profile->id)>{{ $profile->full_name }}</option>
                    @endforeach
                </select>
            </label>
            <label>
                <span class="admin-label">Platform name</span>
                <input type="text" name="platform_name" value="{{ old('platform_name', $socialLink->platform_name) }}" class="admin-input" required>
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Icon key</span>
                <input type="text" name="icon" value="{{ old('icon', $socialLink->icon) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">URL</span>
                <input type="text" name="url" value="{{ old('url', $socialLink->url) }}" class="admin-input" required>
            </label>
            <label>
                <span class="admin-label">Display order</span>
                <input type="number" name="display_order" value="{{ old('display_order', $socialLink->display_order ?? 0) }}" class="admin-input" min="0">
            </label>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.social-links.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>
@endsection
