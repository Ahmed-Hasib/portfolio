<?php

namespace App\Interfaces;

use App\Models\PortfolioProfile;

interface PortfolioProfileRepositoryInterface
{
    public function getActiveProfile(): ?PortfolioProfile;
}
