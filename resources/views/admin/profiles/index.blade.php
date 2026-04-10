@extends('admin.layouts.app')

@php
    $title = 'Profiles';
    $eyebrow = 'Content';
    $heading = 'Profiles';
    $description = 'Manage public portfolio identities, contact information, and active profile selection.';
@endphp

@section('headerActions')
    <a href="{{ route('admin.profiles.create') }}" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
        Add Profile
    </a>
@endsection

@section('content')
    <div class="surface-card overflow-hidden px-0 py-0">
        <div class="overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($profiles as $profile)
                        <tr>
                            <td>{{ $profile->full_name }}</td>
                            <td>{{ $profile->designation }}</td>
                            <td>{{ $profile->email ?: 'Not set' }}</td>
                            <td>{{ $profile->is_active ? 'Active' : 'Inactive' }}</td>
                            <td>{{ $profile->updated_at?->format('M d, Y') }}</td>
                            <td>
                                <div class="flex flex-wrap gap-2">
                                    <a href="{{ route('admin.profiles.edit', $profile) }}" class="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink">
                                        Edit
                                    </a>
                                    <form method="POST" action="{{ route('admin.profiles.destroy', $profile) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3 py-2 text-xs font-semibold text-accent-warm" onclick="return confirm('Delete this profile and all related content?')">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center text-ink-soft">No profiles found.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
