<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExperienceResource;
use App\Services\ProfileService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ExperienceController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService,
    ) {
    }

    public function index(): AnonymousResourceCollection
    {
        return ExperienceResource::collection(
            $this->profileService->getExperiences(),
        );
    }
}
