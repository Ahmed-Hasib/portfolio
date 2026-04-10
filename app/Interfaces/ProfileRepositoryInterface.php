<?php

namespace App\Interfaces;

use App\Models\Education;
use App\Models\Experience;
use App\Models\Gallery;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\Support\Collection;

interface ProfileRepositoryInterface
{
    public function getActiveProfile(): ?Profile;

    /**
     * @return Collection<int, Skill>
     */
    public function getSkills(): Collection;

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection;

    /**
     * @return Collection<int, Education>
     */
    public function getEducations(): Collection;

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection;

    public function getProjectBySlug(string $slug): ?Project;

    /**
     * @return Collection<int, Gallery>
     */
    public function getGalleries(): Collection;

    /**
     * @return Collection<int, SocialLink>
     */
    public function getSocialLinks(): Collection;
}
