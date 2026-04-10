<?php

namespace App\Services;

use App\Interfaces\ProfileRepositoryInterface;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Gallery;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Illuminate\Support\Collection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileService
{
    public function __construct(
        private readonly ProfileRepositoryInterface $profileRepository,
    ) {
    }

    public function findPublicProfile(): ?Profile
    {
        return $this->profileRepository->getActiveProfile();
    }

    public function getPublicProfile(): Profile
    {
        $profile = $this->findPublicProfile();

        if ($profile === null) {
            throw new NotFoundHttpException('Active profile not found.');
        }

        return $profile;
    }

    /**
     * @return Collection<int, Skill>
     */
    public function getSkills(): Collection
    {
        return $this->profileRepository->getSkills();
    }

    /**
     * @return Collection<int, Experience>
     */
    public function getExperiences(): Collection
    {
        return $this->profileRepository->getExperiences();
    }

    /**
     * @return Collection<int, Education>
     */
    public function getEducations(): Collection
    {
        return $this->profileRepository->getEducations();
    }

    /**
     * @return Collection<int, Project>
     */
    public function getProjects(): Collection
    {
        return $this->profileRepository->getProjects();
    }

    public function getProjectBySlug(string $slug): Project
    {
        $project = $this->profileRepository->getProjectBySlug($slug);

        if ($project === null) {
            throw new NotFoundHttpException('Project not found.');
        }

        return $project;
    }

    /**
     * @return Collection<int, Gallery>
     */
    public function getGalleries(): Collection
    {
        return $this->profileRepository->getGalleries();
    }

    /**
     * @return Collection<int, SocialLink>
     */
    public function getSocialLinks(): Collection
    {
        return $this->profileRepository->getSocialLinks();
    }
}
