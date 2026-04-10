<?php

namespace Tests\Feature\Api;

use App\Models\Contact;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Gallery;
use App\Models\JobDescription;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Services\ContactService;
use App\Services\ProfileService;
use Mockery;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Tests\TestCase;

class PortfolioContentApiTest extends TestCase
{
    public function test_profile_endpoint_returns_basic_profile_data(): void
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

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getPublicProfile')->once()->andReturn($profile);
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/profile');

        $response
            ->assertOk()
            ->assertJsonPath('data.full_name', 'Hasib Rahman')
            ->assertJsonPath('data.designation', 'Backend-focused Laravel developer')
            ->assertJsonMissingPath('data.skills');
    }

    public function test_skills_endpoint_returns_ordered_skill_collection(): void
    {
        $skills = collect([
            new Skill([
                'name' => 'Laravel',
                'category' => 'Backend',
                'icon' => 'laravel',
                'proficiency_percentage' => 95,
                'sort_order' => 1,
            ]),
            new Skill([
                'name' => 'React',
                'category' => 'Frontend',
                'icon' => 'react',
                'proficiency_percentage' => 90,
                'sort_order' => 2,
            ]),
        ]);

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getSkills')->once()->andReturn($skills);
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/skills');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Laravel')
            ->assertJsonPath('data.1.name', 'React');
    }

    public function test_experiences_endpoint_returns_job_descriptions(): void
    {
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

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getExperiences')
            ->once()
            ->andReturn(collect([$experience]));
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/experiences');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.company_name', 'Acme Studio')
            ->assertJsonPath(
                'data.0.job_descriptions.0.description',
                'Designed modular Laravel APIs and internal services.',
            );
    }

    public function test_educations_endpoint_returns_collection(): void
    {
        $educations = collect([
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
        ]);

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getEducations')->once()->andReturn($educations);
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/educations');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.institute', 'State University');
    }

    public function test_projects_endpoint_returns_collection(): void
    {
        $projects = collect([
            $this->makeProject('hasib-portfolio-v2'),
        ]);

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getProjects')->once()->andReturn($projects);
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/projects');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.slug', 'hasib-portfolio-v2');
    }

    public function test_project_detail_endpoint_returns_the_matching_project(): void
    {
        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getProjectBySlug')
            ->once()
            ->with('hasib-portfolio-v2')
            ->andReturn($this->makeProject('hasib-portfolio-v2'));
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/projects/hasib-portfolio-v2');

        $response
            ->assertOk()
            ->assertJsonPath('data.slug', 'hasib-portfolio-v2');
    }

    public function test_project_detail_endpoint_returns_not_found_for_unknown_slug(): void
    {
        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getProjectBySlug')
            ->once()
            ->with('missing-project')
            ->andThrow(new NotFoundHttpException('Project not found.'));
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/projects/missing-project');

        $response
            ->assertNotFound()
            ->assertJson([
                'message' => 'Project not found.',
            ]);
    }

    public function test_galleries_endpoint_returns_collection(): void
    {
        $galleries = collect([
            new Gallery([
                'title' => 'Homepage Hero',
                'image' => '/storage/gallery/hero-shot.png',
                'category' => 'UI Design',
                'sort_order' => 1,
            ]),
        ]);

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getGalleries')->once()->andReturn($galleries);
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/galleries');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.title', 'Homepage Hero');
    }

    public function test_social_links_endpoint_returns_collection(): void
    {
        $socialLinks = collect([
            new SocialLink([
                'platform_name' => 'GitHub',
                'icon' => 'github',
                'url' => 'https://github.com/hasib',
                'display_order' => 1,
            ]),
        ]);

        $service = Mockery::mock(ProfileService::class);
        $service->shouldReceive('getSocialLinks')->once()->andReturn($socialLinks);
        $this->app->instance(ProfileService::class, $service);

        $response = $this->getJson('/api/social-links');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.platform_name', 'GitHub');
    }

    public function test_contact_endpoint_validates_required_fields(): void
    {
        $response = $this->postJson('/api/contact', []);

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['name', 'email', 'message']);
    }

    public function test_contact_endpoint_stores_a_submission_and_returns_clean_json(): void
    {
        $contact = new Contact([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '+1555000111',
            'subject' => 'Portfolio enquiry',
            'message' => 'I would like to discuss a Laravel project.',
            'status' => 'new',
        ]);
        $contact->id = 10;
        $contact->created_at = now();

        $service = Mockery::mock(ContactService::class);
        $service->shouldReceive('submit')
            ->once()
            ->with([
                'name' => 'Jane Doe',
                'email' => 'jane@example.com',
                'phone' => '+1555000111',
                'subject' => 'Portfolio enquiry',
                'message' => 'I would like to discuss a Laravel project.',
            ])
            ->andReturn($contact);
        $this->app->instance(ContactService::class, $service);

        $response = $this->postJson('/api/contact', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '+1555000111',
            'subject' => 'Portfolio enquiry',
            'message' => 'I would like to discuss a Laravel project.',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('message', 'Contact submitted successfully.')
            ->assertJsonPath('data.name', 'Jane Doe')
            ->assertJsonPath('data.status', 'new');
    }

    protected function tearDown(): void
    {
        Mockery::close();

        parent::tearDown();
    }

    private function makeProject(string $slug): Project
    {
        return new Project([
            'title' => 'Hasib Portfolio v2',
            'slug' => $slug,
            'thumbnail' => '/storage/projects/portfolio.png',
            'description' => 'Modern portfolio site built with Laravel and React.',
            'tech_stack' => ['Laravel', 'React', 'Tailwind CSS'],
            'live_url' => 'https://portfolio.example.com',
            'github_url' => 'https://github.com/hasib/portfolio',
            'featured' => true,
            'sort_order' => 1,
        ]);
    }
}
