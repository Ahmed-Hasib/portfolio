<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\SkillResource;
use App\Services\ProfileService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SkillController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService,
    ) {
    }

    public function index(): AnonymousResourceCollection
    {
        return SkillResource::collection($this->profileService->getSkills());
    }
}
