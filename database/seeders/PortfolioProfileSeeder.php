<?php

namespace Database\Seeders;

use App\Models\PortfolioProfile;
use Illuminate\Database\Seeder;

class PortfolioProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PortfolioProfile::query()->updateOrCreate(
            ['email' => 'hello@hasib.dev'],
            [
                'full_name' => 'Hasib Rahman',
                'headline' => 'Full-Stack Laravel and React Developer',
                'short_bio' => 'I build modern portfolio experiences with a Laravel backend, clean APIs, and React-based interfaces.',
                'location' => 'Dhaka, Bangladesh',
                'availability' => 'Available for selected freelance work',
                'cv_url' => '/storage/cv/hasib-rahman-cv.pdf',
                'social_links' => [
                    ['label' => 'GitHub', 'url' => 'https://github.com/hasib'],
                    ['label' => 'LinkedIn', 'url' => 'https://linkedin.com/in/hasib'],
                    ['label' => 'Email', 'url' => 'mailto:hello@hasib.dev'],
                ],
                'highlight_metrics' => [
                    ['label' => 'Architecture', 'value' => 'Repository + Resource'],
                    ['label' => 'Frontend', 'value' => 'React with Vite'],
                ],
                'is_active' => true,
            ],
        );
    }
}
