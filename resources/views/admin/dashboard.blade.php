@extends('admin.layouts.app')

@php
    $title = 'Dashboard';
    $eyebrow = 'Overview';
    $heading = 'Portfolio Administration';
    $description = 'Use this panel to manage all database-driven portfolio content and review recent contact submissions.';
@endphp

@section('content')
    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        @foreach ($stats as $label => $value)
            <div class="admin-card">
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">{{ $label }}</p>
                <p class="font-display mt-4 text-4xl font-bold tracking-tight text-ink">{{ $value }}</p>
            </div>
        @endforeach
    </div>

    <div class="surface-card px-6 py-6">
        <div class="flex items-center justify-between gap-4">
            <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">Recent Contact Submissions</p>
                <h2 class="font-display mt-3 text-3xl font-bold tracking-tight">Inbox Snapshot</h2>
            </div>
            <a href="{{ route('admin.contacts.index') }}" class="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-ink">
                View All Contacts
            </a>
        </div>

        <div class="mt-6 overflow-x-auto">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Submitted</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse ($recentContacts as $contact)
                        <tr>
                            <td>{{ $contact->name }}</td>
                            <td>{{ $contact->email }}</td>
                            <td>{{ $contact->subject ?: 'General enquiry' }}</td>
                            <td>{{ $contact->status }}</td>
                            <td>{{ $contact->created_at?->format('M d, Y H:i') }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5" class="text-center text-ink-soft">No contact submissions available yet.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
@endsection
