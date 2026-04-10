@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Inbox';
    $heading = $formTitle;
    $description = 'Edit inbound contact submissions, status, assignment, and read timestamp.';
    $readAtValue = old('read_at', $contact->read_at ? $contact->read_at->format('Y-m-d\TH:i') : '');
@endphp

@section('content')
    <form method="POST" action="{{ $formAction }}" class="surface-card space-y-5 px-6 py-6">
        @csrf
        @if ($formMethod !== 'POST') @method($formMethod) @endif

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Assigned profile</span>
                <select name="profile_id" class="admin-select">
                    <option value="">None</option>
                    @foreach ($profiles as $profile)
                        <option value="{{ $profile->id }}" @selected((string) old('profile_id', $contact->profile_id) === (string) $profile->id)>{{ $profile->full_name }}</option>
                    @endforeach
                </select>
            </label>
            <label>
                <span class="admin-label">Status</span>
                <input type="text" name="status" value="{{ old('status', $contact->status) }}" class="admin-input" required>
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Name</span>
                <input type="text" name="name" value="{{ old('name', $contact->name) }}" class="admin-input" required>
            </label>
            <label>
                <span class="admin-label">Email</span>
                <input type="email" name="email" value="{{ old('email', $contact->email) }}" class="admin-input" required>
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <label>
                <span class="admin-label">Phone</span>
                <input type="text" name="phone" value="{{ old('phone', $contact->phone) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Subject</span>
                <input type="text" name="subject" value="{{ old('subject', $contact->subject) }}" class="admin-input" required>
            </label>
            <label>
                <span class="admin-label">Read at</span>
                <input type="datetime-local" name="read_at" value="{{ $readAtValue }}" class="admin-input">
            </label>
        </div>

        <label>
            <span class="admin-label">Message</span>
            <textarea name="message" class="admin-textarea" required>{{ old('message', $contact->message) }}</textarea>
        </label>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.contacts.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>
@endsection
