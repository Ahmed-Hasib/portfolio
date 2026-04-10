<?php

namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class PortfolioContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $profile = Profile::query()->firstOrCreate(
            ['email' => 'hello@hasib.dev'],
            [
                'full_name' => 'Hasib Rahman',
                'designation' => 'Full-Stack Laravel and React Developer',
                'bio' => 'I build modern portfolio platforms with a Laravel backend, clean APIs, and React-based interfaces.',
                'location' => 'Dhaka, Bangladesh',
                'phone' => '+8801000000000',
                'profile_image' => '/storage/profile/hasib-rahman.png',
                'resume_url' => '/storage/cv/hasib-rahman-cv.pdf',
                'is_active' => true,
            ],
        );

        if ($profile->socialLinks()->doesntExist()) {
            $profile->socialLinks()->createMany([
                [
                    'platform_name' => 'GitHub',
                    'icon' => 'github',
                    'url' => 'https://github.com/hasib',
                    'display_order' => 1,
                ],
                [
                    'platform_name' => 'LinkedIn',
                    'icon' => 'linkedin',
                    'url' => 'https://linkedin.com/in/hasib',
                    'display_order' => 2,
                ],
                [
                    'platform_name' => 'Email',
                    'icon' => 'mail',
                    'url' => 'mailto:hello@hasib.dev',
                    'display_order' => 3,
                ],
            ]);
        }

        foreach ([
            [
                'name' => 'Laravel',
                'category' => 'Backend',
                'icon' => 'laravel',
                'proficiency_percentage' => 95,
                'sort_order' => 1,
            ],
            [
                'name' => 'React',
                'category' => 'Frontend',
                'icon' => 'react',
                'proficiency_percentage' => 90,
                'sort_order' => 2,
            ],
            [
                'name' => 'Next.js',
                'category' => 'Frontend',
                'icon' => 'nextjs',
                'proficiency_percentage' => 82,
                'sort_order' => 3,
            ],
            [
                'name' => 'MySQL',
                'category' => 'Database',
                'icon' => 'database',
                'proficiency_percentage' => 88,
                'sort_order' => 4,
            ],
            [
                'name' => 'Tailwind CSS',
                'category' => 'Styling',
                'icon' => 'wind',
                'proficiency_percentage' => 92,
                'sort_order' => 5,
            ],
            [
                'name' => 'Git',
                'category' => 'Tools',
                'icon' => 'git',
                'proficiency_percentage' => 90,
                'sort_order' => 6,
            ],
            [
                'name' => 'Docker',
                'category' => 'Tools',
                'icon' => 'docker',
                'proficiency_percentage' => 76,
                'sort_order' => 7,
            ],
        ] as $skill) {
            $profile->skills()->updateOrCreate(
                ['name' => $skill['name']],
                $skill,
            );
        }

        $experience = $profile->experiences()->updateOrCreate(
            [
                'company_name' => 'Acme Studio',
                'role' => 'Senior Full-Stack Developer',
            ],
            [
                'employment_type' => 'Full-time',
                'location' => 'Remote',
                'start_date' => '2023-01-01',
                'end_date' => null,
                'is_current' => true,
                'summary' => 'Led backend architecture, frontend delivery, and implementation planning for client-facing web applications.',
                'technologies_used' => [
                    'Laravel',
                    'React',
                    'MySQL',
                    'Tailwind CSS',
                    'Docker',
                ],
                'achievements' => [
                    'Reduced turnaround time for feature delivery by standardizing API and component patterns.',
                    'Introduced a cleaner service-repository workflow that improved maintainability across portfolio-scale projects.',
                ],
                'sort_order' => 1,
            ],
        );

        $experience->jobDescriptions()->updateOrCreate(
            ['sort_order' => 1],
            [
                'description' => 'Designed modular Laravel APIs using service and repository layers to keep controllers thin and business logic reusable.',
            ],
        );
        $experience->jobDescriptions()->updateOrCreate(
            ['sort_order' => 2],
            [
                'description' => 'Built recruiter-friendly React interfaces integrated directly into the Laravel application with reusable section components.',
            ],
        );
        $experience->jobDescriptions()->updateOrCreate(
            ['sort_order' => 3],
            [
                'description' => 'Coordinated frontend and backend delivery with a focus on deployment consistency, maintainability, and fast iteration.',
            ],
        );

        $freelanceExperience = $profile->experiences()->updateOrCreate(
            [
                'company_name' => 'Independent Projects',
                'role' => 'Freelance Laravel Developer',
            ],
            [
                'employment_type' => 'Contract',
                'location' => 'Dhaka, Bangladesh',
                'start_date' => '2021-01-01',
                'end_date' => '2022-12-31',
                'is_current' => false,
                'summary' => 'Delivered custom business applications and portfolio websites for small teams and independent clients.',
                'technologies_used' => [
                    'Laravel',
                    'Blade',
                    'MySQL',
                    'JavaScript',
                ],
                'achievements' => [
                    'Delivered multiple client projects end to end, from requirement breakdown to deployment.',
                    'Built maintainable admin and content-management flows for non-technical stakeholders.',
                ],
                'sort_order' => 2,
            ],
        );

        $freelanceExperience->jobDescriptions()->updateOrCreate(
            ['sort_order' => 1],
            [
                'description' => 'Translated client requirements into structured Laravel applications with clean CRUD flows, validation, and database design.',
            ],
        );
        $freelanceExperience->jobDescriptions()->updateOrCreate(
            ['sort_order' => 2],
            [
                'description' => 'Implemented responsive frontend experiences while balancing client expectations, deadlines, and technical tradeoffs.',
            ],
        );

        if ($profile->educations()->doesntExist()) {
            $profile->educations()->create([
                'institute' => 'State University',
                'degree' => 'Bachelor of Science',
                'field' => 'Computer Science',
                'start_year' => 2017,
                'end_year' => 2021,
                'grade' => '3.80/4.00',
                'summary' => 'Focused on software engineering, databases, and application architecture.',
                'sort_order' => 1,
            ]);
        }

        if ($profile->projects()->doesntExist()) {
            $profile->projects()->createMany([
                [
                    'title' => 'Hasib Portfolio v2',
                    'slug' => 'hasib-portfolio-v2',
                    'thumbnail' => '/storage/projects/portfolio-v2.png',
                    'description' => 'A modern animated portfolio built with Laravel, React, Tailwind CSS, and Framer Motion.',
                    'tech_stack' => ['Laravel', 'React', 'Tailwind CSS', 'Vite'],
                    'live_url' => 'https://portfolio.example.com',
                    'github_url' => 'https://github.com/hasib/portfolio',
                    'featured' => true,
                    'sort_order' => 1,
                ],
                [
                    'title' => 'Project Tracker',
                    'slug' => 'project-tracker',
                    'thumbnail' => '/storage/projects/project-tracker.png',
                    'description' => 'Internal dashboard for tracking delivery milestones, team ownership, and reporting.',
                    'tech_stack' => ['Laravel', 'MySQL', 'Tailwind CSS'],
                    'live_url' => null,
                    'github_url' => 'https://github.com/hasib/project-tracker',
                    'featured' => false,
                    'sort_order' => 2,
                ],
            ]);
        }

        if ($profile->galleries()->doesntExist()) {
            $profile->galleries()->createMany([
                [
                    'image' => '/storage/gallery/hero-shot.png',
                    'title' => 'Portfolio Hero Concept',
                    'category' => 'UI Design',
                    'sort_order' => 1,
                ],
                [
                    'image' => '/storage/gallery/dashboard-shot.png',
                    'title' => 'Dashboard Interface',
                    'category' => 'Product Work',
                    'sort_order' => 2,
                ],
            ]);
        }
    }
}
