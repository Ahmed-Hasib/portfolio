<?php

namespace App\Repositories;

use App\Interfaces\PortfolioProfileRepositoryInterface;
use App\Models\PortfolioProfile;

class PortfolioProfileRepository implements PortfolioProfileRepositoryInterface
{
    public function getActiveProfile(): ?PortfolioProfile
    {
        return PortfolioProfile::query()
            ->where('is_active', true)
            ->latest('id')
            ->first();
    }
}
