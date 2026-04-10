<?php

namespace App\Repositories;

use App\Interfaces\ProfileRepositoryInterface;
use App\Models\Profile;

class ProfileRepository implements ProfileRepositoryInterface
{
    public function getActiveProfileWithRelations(): ?Profile
    {
        return Profile::query()
            ->with([
                'skills' => fn ($query) => $query->orderBy('sort_order')->orderBy('id'),
                'experiences' => fn ($query) => $query
                    ->orderByDesc('start_date')
                    ->orderBy('sort_order')
                    ->orderByDesc('id'),
                'experiences.jobDescriptions' => fn ($query) => $query
                    ->orderBy('sort_order')
                    ->orderBy('id'),
                'educations' => fn ($query) => $query
                    ->orderByDesc('start_year')
                    ->orderBy('sort_order')
                    ->orderByDesc('id'),
                'projects' => fn ($query) => $query
                    ->orderByDesc('featured')
                    ->orderBy('sort_order')
                    ->orderBy('title'),
                'galleries' => fn ($query) => $query->orderBy('sort_order')->orderBy('id'),
                'socialLinks' => fn ($query) => $query
                    ->orderBy('display_order')
                    ->orderBy('id'),
            ])
            ->where('is_active', true)
            ->latest('id')
            ->first();
    }
}
