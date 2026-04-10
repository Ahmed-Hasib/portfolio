<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PortfolioProfileResource;
use App\Services\PortfolioProfileService;

class PortfolioProfileController extends Controller
{
    public function __construct(
        private readonly PortfolioProfileService $portfolioProfileService,
    ) {
    }

    public function show(): PortfolioProfileResource
    {
        return new PortfolioProfileResource(
            $this->portfolioProfileService->getPublicProfile(),
        );
    }
}
