<?php

namespace Tests\Unit\Services;

use App\Models\Project;
use App\Interfaces\ProfileRepositoryInterface;
use App\Models\Profile;
use App\Services\ProfileService;
use Mockery;
use PHPUnit\Framework\Attributes\CoversClass;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;

#[CoversClass(ProfileService::class)]
class ProfileServiceTest extends TestCase
{
    public function test_it_returns_the_active_profile_from_the_repository(): void
    {
        $profile = new Profile([
            'full_name' => 'Hasib Rahman',
            'designation' => 'Full-Stack Laravel and React Developer',
            'is_active' => true,
        ]);

        $repository = Mockery::mock(ProfileRepositoryInterface::class);
        $repository->shouldReceive('getActiveProfile')
            ->once()
            ->andReturn($profile);

        $service = new ProfileService($repository);

        $this->assertSame($profile, $service->getPublicProfile());
    }

    public function test_it_throws_a_not_found_exception_when_no_profile_exists(): void
    {
        $repository = Mockery::mock(ProfileRepositoryInterface::class);
        $repository->shouldReceive('getActiveProfile')
            ->once()
            ->andReturnNull();

        $service = new ProfileService($repository);

        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage('Active profile not found.');

        $service->getPublicProfile();
    }

    public function test_it_returns_the_project_for_a_matching_slug(): void
    {
        $project = new Project([
            'title' => 'Hasib Portfolio v2',
            'slug' => 'hasib-portfolio-v2',
        ]);

        $repository = Mockery::mock(ProfileRepositoryInterface::class);
        $repository->shouldReceive('getProjectBySlug')
            ->once()
            ->with('hasib-portfolio-v2')
            ->andReturn($project);

        $service = new ProfileService($repository);

        $this->assertSame($project, $service->getProjectBySlug('hasib-portfolio-v2'));
    }

    public function test_it_throws_not_found_when_the_project_slug_does_not_exist(): void
    {
        $repository = Mockery::mock(ProfileRepositoryInterface::class);
        $repository->shouldReceive('getProjectBySlug')
            ->once()
            ->with('missing-project')
            ->andReturnNull();

        $service = new ProfileService($repository);

        $this->expectException(NotFoundHttpException::class);
        $this->expectExceptionMessage('Project not found.');

        $service->getProjectBySlug('missing-project');
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}
