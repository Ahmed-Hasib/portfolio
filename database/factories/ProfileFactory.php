<?php

namespace Database\Factories;

use App\Models\Profile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Profile>
 */
class ProfileFactory extends Factory
{
    protected $model = Profile::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => 'Hasib Rahman',
            'designation' => 'Full-Stack Laravel and React Developer',
            'bio' => 'I build modern web applications with scalable Laravel backends and polished React frontends.',
            'location' => 'Dhaka, Bangladesh',
            'email' => 'hello@hasib.dev',
            'phone' => '+8801000000000',
            'profile_image' => '/storage/profile/hasib-rahman.png',
            'resume_url' => '/storage/cv/hasib-rahman-cv.pdf',
            'is_active' => true,
        ];
    }
}
