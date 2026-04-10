<?php

namespace Tests\Unit\Services;

use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\ProfileRepositoryInterface;
use App\Mail\ContactSubmissionReceived;
use App\Models\Contact;
use App\Models\Profile;
use App\Services\ContactService;
use Illuminate\Support\Facades\Mail;
use Mockery;
use PHPUnit\Framework\Attributes\CoversClass;
use Tests\TestCase;

#[CoversClass(ContactService::class)]
class ContactServiceTest extends TestCase
{
    public function test_it_stores_a_contact_submission_with_the_active_profile_id(): void
    {
        config()->set('portfolio.contact.notification_email', null);

        $profile = new Profile(['full_name' => 'Hasib Rahman']);
        $profile->id = 5;

        $contact = new Contact([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Hello there',
            'status' => 'new',
        ]);

        $profileRepository = Mockery::mock(ProfileRepositoryInterface::class);
        $profileRepository->shouldReceive('getActiveProfile')
            ->once()
            ->andReturn($profile);

        $contactRepository = Mockery::mock(ContactRepositoryInterface::class);
        $contactRepository->shouldReceive('create')
            ->once()
            ->with([
                'profile_id' => 5,
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'phone' => null,
                'subject' => 'Project enquiry',
                'message' => 'Hello there',
                'status' => 'new',
            ])
            ->andReturn($contact);

        $service = new ContactService($contactRepository, $profileRepository);

        $this->assertSame($contact, $service->submit([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Project enquiry',
            'message' => 'Hello there',
        ]));
    }

    public function test_it_allows_contact_submission_without_an_active_profile(): void
    {
        config()->set('portfolio.contact.notification_email', null);

        $contact = new Contact([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'message' => 'Hello there',
            'status' => 'new',
        ]);

        $profileRepository = Mockery::mock(ProfileRepositoryInterface::class);
        $profileRepository->shouldReceive('getActiveProfile')
            ->once()
            ->andReturnNull();

        $contactRepository = Mockery::mock(ContactRepositoryInterface::class);
        $contactRepository->shouldReceive('create')
            ->once()
            ->with([
                'profile_id' => null,
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'phone' => '+1555000111',
                'subject' => 'General enquiry',
                'message' => 'Hello there',
                'status' => 'new',
            ])
            ->andReturn($contact);

        $service = new ContactService($contactRepository, $profileRepository);

        $this->assertSame($contact, $service->submit([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '+1555000111',
            'subject' => 'General enquiry',
            'message' => 'Hello there',
        ]));
    }

    public function test_it_sends_a_notification_email_when_a_recipient_is_configured(): void
    {
        Mail::fake();
        config()->set('portfolio.contact.notification_email', 'owner@example.com');

        $profile = new Profile(['full_name' => 'Hasib Rahman']);
        $profile->id = 7;

        $contact = new Contact([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Project enquiry',
            'message' => 'Hello there',
            'status' => 'new',
        ]);

        $profileRepository = Mockery::mock(ProfileRepositoryInterface::class);
        $profileRepository->shouldReceive('getActiveProfile')
            ->once()
            ->andReturn($profile);

        $contactRepository = Mockery::mock(ContactRepositoryInterface::class);
        $contactRepository->shouldReceive('create')
            ->once()
            ->andReturn($contact);

        $service = new ContactService($contactRepository, $profileRepository);

        $service->submit([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Project enquiry',
            'message' => 'Hello there',
        ]);

        Mail::assertSent(ContactSubmissionReceived::class);
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}
