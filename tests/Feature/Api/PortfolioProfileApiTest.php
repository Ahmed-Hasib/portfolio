<?php

namespace Tests\Feature\Api;

use App\Models\PortfolioProfile;
use App\Services\PortfolioProfileService;
use Mockery;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;

class PortfolioProfileApiTest extends TestCase
{
    public function test_it_returns_the_active_portfolio_profile_using_resource_formatting(): void
    {
        $profile = new PortfolioProfile([
            'full_name' => 'Hasib Rahman',
            'headline' => 'Backend-focused Laravel developer',
            'short_bio' => 'I design scalable backend architecture for modern portfolio applications.',
            'location' => 'Dhaka, Bangladesh',
            'email' => 'hello@hasib.dev',
            'availability' => 'Available for selected freelance work',
            'cv_url' => '/storage/cv/hasib-rahman-cv.pdf',
            'social_links' => [
                ['label' => 'GitHub', 'url' => 'https://github.com/hasib'],
            ],
            'highlight_metrics' => [
                ['label' => 'Primary stack', 'value' => 'Laravel + React'],
            ],
            'is_active' => true,
        ]);
        $profile->id = 1;
        $profile->updated_at = now();

        $service = Mockery::mock(PortfolioProfileService::class);
        $service->shouldReceive('getPublicProfile')->once()->andReturn($profile);
        $this->app->instance(PortfolioProfileService::class, $service);

        $response = $this->getJson('/api/portfolio/profile');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'full_name',
                    'headline',
                    'short_bio',
                    'location',
                    'email',
                    'availability',
                    'cv_url',
                    'social_links',
                    'highlight_metrics',
                    'is_active',
                    'updated_at',
                ],
            ])
            ->assertJsonPath('data.full_name', 'Hasib Rahman')
            ->assertJsonPath('data.headline', 'Backend-focused Laravel developer')
            ->assertJsonPath('data.email', 'hello@hasib.dev')
            ->assertJsonPath('data.is_active', true);
    }

    public function test_it_returns_not_found_when_no_active_profile_exists(): void
    {
        $service = Mockery::mock(PortfolioProfileService::class);
        $service->shouldReceive('getPublicProfile')
            ->once()
            ->andThrow(new NotFoundHttpException('Active portfolio profile not found.'));
        $this->app->instance(PortfolioProfileService::class, $service);

        $response = $this->getJson('/api/portfolio/profile');

        $response
            ->assertNotFound()
            ->assertJson([
                'message' => 'Active portfolio profile not found.',
            ]);
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}
