<?php

namespace Database\Factories;

use App\Models\PortfolioProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PortfolioProfile>
 */
class PortfolioProfileFactory extends Factory
{
    protected $model = PortfolioProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => 'Hasib Rahman',
            'headline' => 'Full-Stack Laravel and React Developer',
            'short_bio' => 'I build modern web applications with scalable backend architecture and intentional frontend experiences.',
            'location' => 'Dhaka, Bangladesh',
            'email' => 'hello@hasib.dev',
            'availability' => 'Open to freelance and full-time opportunities',
            'cv_url' => '/storage/cv/hasib-rahman-cv.pdf',
            'social_links' => [
                ['label' => 'GitHub', 'url' => 'https://github.com/hasib'],
                ['label' => 'LinkedIn', 'url' => 'https://linkedin.com/in/hasib'],
            ],
            'highlight_metrics' => [
                ['label' => 'Years building products', 'value' => '4+'],
                ['label' => 'Primary stack', 'value' => 'Laravel + React'],
            ],
            'is_active' => true,
        ];
    }
}
