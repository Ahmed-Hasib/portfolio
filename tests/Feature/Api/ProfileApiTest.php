<?php

namespace Tests\Feature\Api;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Gallery;
use App\Models\JobDescription;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Services\ProfileService;
use Mockery;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;

class ProfileApiTest extends TestCase
{
    public function test_it_returns_the_active_profile_with_nested_portfolio_content(): void
    {
        $profile = new Profile([
            'full_name' => 'Hasib Rahman',
            'designation' => 'Backend-focused Laravel developer',
            'bio' => 'I design scalable backend architecture for modern portfolio applications.',
            'location' => 'Dhaka, Bangladesh',
            'email' => 'hello@hasib.dev',
            'phone' => '+8801000000000',
            'profile_image' => '/storage/profile/hasib-rahman.png',
            'resume_url' => '/storage/cv/hasib-rahman-cv.pdf',
            'is_active' => true,
        ]);
        $profile->id = 1;
        $profile->updated_at = now();
        $profile->setRelation('skills', collect([
            new Skill([
                'name' => 'Laravel',
                'category' => 'Backend',
                'icon' => 'laravel',
                'proficiency_percentage' => 95,
                'sort_order' => 1,
            ]),
        ]));

        $experience = new Experience([
            'company_name' => 'Acme Studio',
            'role' => 'Senior Developer',
            'employment_type' => 'Full-time',
            'location' => 'Remote',
            'start_date' => '2023-01-01',
            'end_date' => null,
            'is_current' => true,
            'summary' => 'Led backend architecture decisions for client platforms.',
            'sort_order' => 1,
        ]);
        $experience->setRelation('jobDescriptions', collect([
            new JobDescription([
                'description' => 'Designed modular Laravel APIs and internal services.',
                'sort_order' => 1,
            ]),
        ]));
        $profile->setRelation('experiences', collect([$experience]));
        $profile->setRelation('educations', collect([
            new Education([
                'institute' => 'State University',
                'degree' => 'BSc',
                'field' => 'Computer Science',
                'start_year' => 2017,
                'end_year' => 2021,
                'grade' => '3.80/4.00',
                'summary' => 'Focused on software engineering fundamentals.',
                'sort_order' => 1,
            ]),
        ]));
        $profile->setRelation('projects', collect([
            new Project([
                'title' => 'Hasib Portfolio v2',
                'slug' => 'hasib-portfolio-v2',
                'thumbnail' => '/storage/projects/portfolio.png',
                'description' => 'Modern portfolio site built with Laravel and React.',
                'tech_stack' => ['Laravel', 'React', 'Tailwind CSS'],
                'live_url' => 'https://portfolio.example.com',
                'github_url' => 'https://github.com/hasib/portfolio',
                'featured' => true,
                'sort_order' => 1,
            ]),
        ]));
        $profile->setRelation('galleries', collect([
            new Gallery([
                'title' => 'Homepage Hero',
                'image' => '/storage/gallery/hero-shot.png',
                'category' => 'UI Design',
                'sort_order' => 1,
            ]),
        ]));
        $profile->setRelation('socialLinks', collect([
            new SocialLink([
                'platform_name' => 'GitHub',
                'icon' => 'github',
                'url' => 'https://github.com/hasib',
                'display_order' => 1,
            ]),
        ]));

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getPublicProfile')->once()->andReturn($profile);
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/portfolio/profile');

        $response
            ->assertOk()
            ->assertJsonPath('data.full_name', 'Hasib Rahman')
            ->assertJsonPath('data.designation', 'Backend-focused Laravel developer')
            ->assertJsonPath('data.skills.0.name', 'Laravel')
            ->assertJsonPath('data.experiences.0.job_descriptions.0.description', 'Designed modular Laravel APIs and internal services.')
            ->assertJsonPath('data.projects.0.slug', 'hasib-portfolio-v2')
            ->assertJsonPath('data.social_links.0.platform_name', 'GitHub');
    }

    public function test_it_returns_not_found_when_no_active_profile_exists(): void
    {
        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getPublicProfile')
            ->once()
            ->andThrow(new NotFoundHttpException('Active profile not found.'));
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/portfolio/profile');

        $response
            ->assertNotFound()
            ->assertJson([
                'message' => 'Active profile not found.',
            ]);
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }
}
