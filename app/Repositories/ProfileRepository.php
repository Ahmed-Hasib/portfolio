<?php

namespace App\Repositories;

use App\Interfaces\ProfileRepositoryInterface;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Gallery;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\Support\Collection;

class ProfileRepository implements ProfileRepositoryInterface
{
    public function getActiveProfile(): ?Profile
    {
        return Profile::query()
            ->where('is_active', true)
            ->latest('id')
            ->first();
    }

    /**
     * @return Collection<int, Skill>
     */
    public function getSkills(): Collection
    {
        $profile = $this->getActiveProfile();

        if ($profile === null) {
            return collect();
        }

        return $profile->skills()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection
    {
        $profile = $this->getActiveProfile();

        if ($profile === null) {
            return collect();
        }

        return $profile->experiences()
            ->with([
                'jobDescriptions' => fn ($query) => $query
                    ->orderBy('sort_order')
                    ->orderBy('id'),
            ])
            ->orderByDesc('start_date')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * @return Collection<int, Education>
     */
    public function getEducations(): Collection
    {
        $profile = $this->getActiveProfile();

        if ($profile === null) {
            return collect();
        }

        return $profile->educations()
            ->orderByDesc('start_year')
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        $profile = $this->getActiveProfile();

        if ($profile === null) {
            return collect();
        }

        return $profile->projects()
            ->orderByDesc('featured')
            ->orderBy('sort_order')
            ->orderBy('title')
            ->get();
    }

    public function getProjectBySlug(string $slug): ?Project
    {
        $profile = $this->getActiveProfile();

        if ($profile === null) {
            return null;
        }

        return $profile->projects()
            ->where('slug', $slug)
            ->first();
    }

    /**
     * @return Collection<int, Gallery>
     */
    public function getGalleries(): Collection
    {
        $profile = $this->getActiveProfile();

        if ($profile === null) {
            return collect();
        }

        return $profile->galleries()
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();
    }

    /**
     * @return Collection<int, SocialLink>
     */
    public function getSocialLinks(): Collection
    {
        $profile = $this->getActiveProfile();

        if ($profile === null) {
            return collect();
        }

        return $profile->socialLinks()
            ->orderBy('display_order')
            ->orderBy('id')
            ->get();
    }
}
