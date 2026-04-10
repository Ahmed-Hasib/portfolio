@extends('admin.layouts.app')

@php
    $title = 'Skills';
    $eyebrow = 'Content';
    $heading = 'Skills';
    $description = 'Manage categorized skills, proficiency levels, and sort order for the resume section.';
@endphp

@section('headerActions')
    <a href="{{ route('admin.skills.create') }}" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Add Skill</a>
@endsection

@section('content')
    <div class="surface-card overflow-hidden px-0 py-0">
        <div class="overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Profile</th>
                        <th>Category</th>
                        <th>Proficiency</th>
                        <th>Order</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($skills as $skill)
                        <tr>
                            <td>{{ $skill->name }}</td>
                            <td>{{ $skill->profile?->full_name }}</td>
                            <td>{{ $skill->category ?: 'General' }}</td>
                            <td>{{ $skill->proficiency_percentage ?: 0 }}%</td>
                            <td>{{ $skill->sort_order }}</td>
                            <td>
                                <div class="flex flex-wrap gap-2">
                                    <a href="{{ route('admin.skills.edit', $skill) }}" class="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink">Edit</a>
                                    <form method="POST" action="{{ route('admin.skills.destroy', $skill) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3 py-2 text-xs font-semibold text-accent-warm" onclick="return confirm('Delete this skill?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="6" class="text-center text-ink-soft">No skills found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
