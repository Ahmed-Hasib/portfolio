<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProfileResource;
use App\Services\ProfileService;

class ProfileController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService,
    ) {
    }

    public function show(): ProfileResource
    {
        return new ProfileResource($this->profileService->getPublicProfile());
    }
}
