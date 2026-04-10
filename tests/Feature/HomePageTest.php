<?php

namespace Tests\Feature;

use App\Models\Profile;
use App\Models\SocialLink;
use App\Services\ProfileService;
use Illuminate\Support\Collection;
use Mockery;
use Tests\TestCase;

class HomePageTest extends TestCase
{
    public function test_the_home_page_returns_seo_metadata_and_security_headers(): void
    {
        config()->set('portfolio.security.force_https', true);
        config()->set('portfolio.seo.twitter_site', '@hasib');

        $profile = new Profile([
            'full_name' => 'Hasib Rahman',
            'designation' => 'Full-Stack Laravel and React Developer',
            'bio' => 'I build modern portfolio platforms with Laravel APIs and polished React interfaces.',
            'profile_image' => '/storage/profile/hasib-rahman.png',
            'email' => 'hello@hasib.dev',
            'location' => 'Dhaka, Bangladesh',
        ]);

        $socialLinks = new Collection([
            new SocialLink([
                'platform_name' => 'GitHub',
                'url' => 'https://github.com/hasib',
            ]),
        ]);

        $profileService = Mockery::mock(ProfileService::class);
        $profileService->shouldReceive('findPublicProfile')
            ->once()
            ->andReturn($profile);
        $profileService->shouldReceive('getSocialLinks')
            ->once()
            ->andReturn($socialLinks);
        $this->app->instance(ProfileService::class, $profileService);

        $response = $this->get('/');

        $response
            ->assertOk()
            ->assertSee('<title>Hasib Rahman | Full-Stack Laravel and React Developer</title>', false)
            ->assertSee('meta name="description" content="I build modern portfolio platforms with Laravel APIs and polished React interfaces."', false)
            ->assertSee('property="og:title" content="Hasib Rahman | Full-Stack Laravel and React Developer"', false)
            ->assertSee('name="twitter:site" content="@hasib"', false)
            ->assertHeader('X-Frame-Options', 'SAMEORIGIN')
            ->assertHeader('X-Content-Type-Options', 'nosniff')
            ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}
