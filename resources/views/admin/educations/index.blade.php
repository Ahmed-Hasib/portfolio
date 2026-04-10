@extends('admin.layouts.app')

@php
    $title = 'Educations';
    $eyebrow = 'Content';
    $heading = 'Educations';
    $description = 'Manage academic history, institutions, results, and supporting notes.';
@endphp

@section('headerActions')
    <a href="{{ route('admin.educations.create') }}" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Add Education</a>
@endsection

@section('content')
    <div class="surface-card overflow-hidden px-0 py-0">
        <div class="overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Degree</th>
                        <th>Institute</th>
                        <th>Profile</th>
                        <th>Years</th>
                        <th>Grade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($educations as $education)
                        <tr>
                            <td>{{ $education->degree }}</td>
                            <td>{{ $education->institute }}</td>
                            <td>{{ $education->profile?->full_name }}</td>
                            <td>{{ $education->start_year }} - {{ $education->end_year ?: 'Present' }}</td>
                            <td>{{ $education->grade ?: 'N/A' }}</td>
                            <td>
                                <div class="flex flex-wrap gap-2">
                                    <a href="{{ route('admin.educations.edit', $education) }}" class="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink">Edit</a>
                                    <form method="POST" action="{{ route('admin.educations.destroy', $education) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3 py-2 text-xs font-semibold text-accent-warm" onclick="return confirm('Delete this education entry?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="text-center text-ink-soft">No education entries found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
