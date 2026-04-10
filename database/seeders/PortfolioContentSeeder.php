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

        if ($profile->skills()->doesntExist()) {
            $profile->skills()->createMany([
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
                    'name' => 'MySQL',
                    'category' => 'Database',
                    'icon' => 'database',
                    'proficiency_percentage' => 88,
                    'sort_order' => 3,
                ],
                [
                    'name' => 'Tailwind CSS',
                    'category' => 'Styling',
                    'icon' => 'wind',
                    'proficiency_percentage' => 92,
                    'sort_order' => 4,
                ],
            ]);
        }

        if ($profile->experiences()->doesntExist()) {
            $experience = $profile->experiences()->create([
                'company_name' => 'Acme Studio',
                'role' => 'Senior Full-Stack Developer',
                'employment_type' => 'Full-time',
                'location' => 'Remote',
                'start_date' => '2023-01-01',
                'end_date' => null,
                'is_current' => true,
                'summary' => 'Led backend architecture and frontend delivery for client-facing web applications.',
                'sort_order' => 1,
            ]);

            $experience->jobDescriptions()->createMany([
                [
                    'description' => 'Designed modular Laravel APIs using service and repository layers.',
                    'sort_order' => 1,
                ],
                [
                    'description' => 'Built React interfaces integrated directly into the Laravel application.',
                    'sort_order' => 2,
                ],
                [
                    'description' => 'Improved deployment consistency and code maintainability across multiple projects.',
                    'sort_order' => 3,
                ],
            ]);
        }

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
