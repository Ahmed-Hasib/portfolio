<?php

namespace App\Interfaces;

use App\Models\Profile;

interface ProfileRepositoryInterface
{
    public function getActiveProfileWithRelations(): ?Profile;
}
