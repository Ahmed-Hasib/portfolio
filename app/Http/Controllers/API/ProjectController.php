<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Services\ProfileService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ProjectController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService,
    ) {
    }

    public function index(): AnonymousResourceCollection
    {
        return ProjectResource::collection($this->profileService->getProjects());
    }

    public function show(string $slug): ProjectResource
    {
        return new ProjectResource($this->profileService->getProjectBySlug($slug));
    }
}
