@extends('admin.layouts.app')

@php
    $title = 'Galleries';
    $eyebrow = 'Content';
    $heading = 'Galleries';
    $description = 'Manage gallery images, labels, categories, and sort ordering.';
@endphp

@section('headerActions')
    <a href="{{ route('admin.galleries.create') }}" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Add Gallery Item</a>
@endsection

@section('content')
    <div class="surface-card overflow-hidden px-0 py-0">
        <div class="overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Profile</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($galleries as $gallery)
                        <tr>
                            <td>{{ $gallery->title ?: 'Untitled' }}</td>
                            <td>{{ $gallery->profile?->full_name }}</td>
                            <td>{{ $gallery->category ?: 'General' }}</td>
                            <td>{{ $gallery->image }}</td>
                            <td>{{ $gallery->sort_order }}</td>
                            <td>
                                <div class="flex flex-wrap gap-2">
                                    <a href="{{ route('admin.galleries.edit', $gallery) }}" class="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink">Edit</a>
                                    <form method="POST" action="{{ route('admin.galleries.destroy', $gallery) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3 py-2 text-xs font-semibold text-accent-warm" onclick="return confirm('Delete this gallery item?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="text-center text-ink-soft">No gallery items found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
