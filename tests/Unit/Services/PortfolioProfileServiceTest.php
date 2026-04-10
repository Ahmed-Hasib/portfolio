<?php

namespace Tests\Unit\Services;

use App\Interfaces\PortfolioProfileRepositoryInterface;
use App\Models\PortfolioProfile;
use App\Services\PortfolioProfileService;
use Mockery;
use PHPUnit\Framework\Attributes\CoversClass;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;

#[CoversClass(PortfolioProfileService::class)]
class PortfolioProfileServiceTest extends TestCase
{
    public function test_it_returns_the_active_profile_from_the_repository(): void
    {
        $profile = new PortfolioProfile([
            'full_name' => 'Hasib Rahman',
            'headline' => 'Full-Stack Laravel and React Developer',
            'is_active' => true,
        ]);

        $repository = Mockery::mock(PortfolioProfileRepositoryInterface::class);
        $repository->shouldReceive('getActiveProfile')->once()->andReturn($profile);

        $service = new PortfolioProfileService($repository);

        $this->assertSame($profile, $service->getPublicProfile());
    }

    public function test_it_throws_a_not_found_exception_when_no_profile_exists(): void
    {
        $repository = Mockery::mock(PortfolioProfileRepositoryInterface::class);
        $repository->shouldReceive('getActiveProfile')->once()->andReturnNull();

        $service = new PortfolioProfileService($repository);

        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage('Active portfolio profile not found.');

        $service->getPublicProfile();
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}
