@extends('admin.layouts.app')

@php
    $title = 'Social Links';
    $eyebrow = 'Content';
    $heading = 'Social Links';
    $description = 'Manage platform labels, URLs, icons, and display ordering.';
@endphp

@section('headerActions')
    <a href="{{ route('admin.social-links.create') }}" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Add Social Link</a>
@endsection

@section('content')
    <div class="surface-card overflow-hidden px-0 py-0">
        <div class="overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Profile</th>
                        <th>Icon</th>
                        <th>URL</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($socialLinks as $socialLink)
                        <tr>
                            <td>{{ $socialLink->platform_name }}</td>
                            <td>{{ $socialLink->profile?->full_name }}</td>
                            <td>{{ $socialLink->icon ?: 'N/A' }}</td>
                            <td>{{ $socialLink->url }}</td>
                            <td>{{ $socialLink->display_order }}</td>
                            <td>
                                <div class="flex flex-wrap gap-2">
                                    <a href="{{ route('admin.social-links.edit', $socialLink) }}" class="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink">Edit</a>
                                    <form method="POST" action="{{ route('admin.social-links.destroy', $socialLink) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3 py-2 text-xs font-semibold text-accent-warm" onclick="return confirm('Delete this social link?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="text-center text-ink-soft">No social links found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
