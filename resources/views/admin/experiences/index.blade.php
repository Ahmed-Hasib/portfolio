@extends('admin.layouts.app')

@php
    $title = 'Experiences';
    $eyebrow = 'Content';
    $heading = 'Experiences';
    $description = 'Manage recruiter-facing work history, responsibilities, technologies, and achievements.';
@endphp

@section('headerActions')
    <a href="{{ route('admin.experiences.create') }}" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Add Experience</a>
@endsection

@section('content')
    <div class="surface-card overflow-hidden px-0 py-0">
        <div class="overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Profile</th>
                        <th>Duration</th>
                        <th>Responsibilities</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($experiences as $experience)
                        <tr>
                            <td>{{ $experience->role }}</td>
                            <td>{{ $experience->company_name }}</td>
                            <td>{{ $experience->profile?->full_name }}</td>
                            <td>{{ $experience->start_date?->format('M Y') }} - {{ $experience->end_date?->format('M Y') ?? ($experience->is_current ? 'Present' : 'N/A') }}</td>
                            <td>{{ $experience->jobDescriptions->count() }}</td>
                            <td>
                                <div class="flex flex-wrap gap-2">
                                    <a href="{{ route('admin.experiences.edit', $experience) }}" class="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink">Edit</a>
                                    <form method="POST" action="{{ route('admin.experiences.destroy', $experience) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3 py-2 text-xs font-semibold text-accent-warm" onclick="return confirm('Delete this experience?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="text-center text-ink-soft">No experiences found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
