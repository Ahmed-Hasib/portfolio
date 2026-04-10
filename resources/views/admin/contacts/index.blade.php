@extends('admin.layouts.app')

@php
    $title = 'Contacts';
    $eyebrow = 'Inbox';
    $heading = 'Contact Submissions';
    $description = 'Review, update, create, or remove contact entries stored from the public form or added manually.';
@endphp

@section('headerActions')
    <a href="{{ route('admin.contacts.create') }}" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Add Contact Entry</a>
@endsection

@section('content')
    <div class="surface-card overflow-hidden px-0 py-0">
        <div class="overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Profile</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($contacts as $contact)
                        <tr>
                            <td>{{ $contact->name }}</td>
                            <td>{{ $contact->email }}</td>
                            <td>{{ $contact->subject }}</td>
                            <td>{{ $contact->status }}</td>
                            <td>{{ $contact->profile?->full_name ?: 'Unassigned' }}</td>
                            <td>{{ \Illuminate\Support\Str::limit($contact->message, 70) }}</td>
                            <td>
                                <div class="flex flex-wrap gap-2">
                                    <a href="{{ route('admin.contacts.edit', $contact) }}" class="rounded-full border border-black/10 bg-white px-3 py-2 text-xs font-semibold text-ink">Edit</a>
                                    <form method="POST" action="{{ route('admin.contacts.destroy', $contact) }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="rounded-full border border-accent-warm/20 bg-accent-warm/10 px-3 py-2 text-xs font-semibold text-accent-warm" onclick="return confirm('Delete this contact entry?')">Delete</button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr><td colspan="7" class="text-center text-ink-soft">No contact entries found.</td></tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
