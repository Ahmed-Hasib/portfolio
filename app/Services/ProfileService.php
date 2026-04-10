<?php

namespace App\Services;

use App\Interfaces\ProfileRepositoryInterface;
use App\Models\Profile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ProfileService
{
    public function __construct(
        private readonly ProfileRepositoryInterface $profileRepository,
    ) {
    }

    public function getPublicProfile(): Profile
    {
        $profile = $this->profileRepository->getActiveProfileWithRelations();

        if ($profile === null) {
            throw new NotFoundHttpException('Active profile not found.');
        }

        return $profile;
    }
}
