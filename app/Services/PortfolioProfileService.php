<?php

namespace App\Services;

use App\Interfaces\PortfolioProfileRepositoryInterface;
use App\Models\PortfolioProfile;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PortfolioProfileService
{
    public function __construct(
        private readonly PortfolioProfileRepositoryInterface $portfolioProfileRepository,
    ) {
    }

    public function getPublicProfile(): PortfolioProfile
    {
        $profile = $this->portfolioProfileRepository->getActiveProfile();

        if ($profile === null) {
            throw new NotFoundHttpException('Active portfolio profile not found.');
        }

        return $profile;
    }
}
