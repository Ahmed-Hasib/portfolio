<!DOCTYPE html>
<html lang="en">
    <body style="font-family: Arial, sans-serif; color: #102229; line-height: 1.6;">
        <h1 style="font-size: 22px; margin-bottom: 16px;">New Contact Submission</h1>

        <p><strong>Name:</strong> {{ $contact->name }}</p>
        <p><strong>Email:</strong> {{ $contact->email }}</p>
        <p><strong>Phone:</strong> {{ $contact->phone ?: 'Not provided' }}</p>
        <p><strong>Subject:</strong> {{ $contact->subject ?: 'General enquiry' }}</p>
        <p><strong>Status:</strong> {{ $contact->status }}</p>

        <h2 style="font-size: 18px; margin-top: 24px;">Message</h2>
        <p style="white-space: pre-line;">{{ $contact->message }}</p>
    </body>
</html>
