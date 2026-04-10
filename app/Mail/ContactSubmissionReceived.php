<?php

namespace App\Mail;

use App\Models\Contact;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactSubmissionReceived extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(
        public readonly Contact $contact,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New portfolio contact submission',
            replyTo: [
                $this->contact->email,
            ],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'mail.contact-submission-received',
        );
    }
}
