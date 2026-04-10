<?php

namespace App\Services;

use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\ProfileRepositoryInterface;
use App\Mail\ContactSubmissionReceived;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use Throwable;

class ContactService
{
    public function __construct(
        private readonly ContactRepositoryInterface $contactRepository,
        private readonly ProfileRepositoryInterface $profileRepository,
    ) {
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function submit(array $data): Contact
    {
        $profile = $this->profileRepository->getActiveProfile();

        $contact = $this->contactRepository->create([
            'profile_id' => $profile?->id,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'subject' => $data['subject'] ?? null,
            'message' => $data['message'],
            'status' => 'new',
        ]);

        $this->sendNotification($contact);

        return $contact;
    }

    private function sendNotification(Contact $contact): void
    {
        $notificationEmail = config('portfolio.contact.notification_email');

        if (blank($notificationEmail)) {
            return;
        }

        try {
            Mail::to($notificationEmail)->send(
                new ContactSubmissionReceived($contact),
            );
        } catch (Throwable $exception) {
            report($exception);
        }
    }
}
