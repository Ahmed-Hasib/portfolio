<?php

namespace App\Services;

use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\ProfileRepositoryInterface;
use App\Models\Contact;

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

        return $this->contactRepository->create([
            'profile_id' => $profile?->id,
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'subject' => $data['subject'] ?? null,
            'message' => $data['message'],
            'status' => 'new',
        ]);
    }
}
