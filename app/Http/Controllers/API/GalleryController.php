<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\GalleryResource;
use App\Services\ProfileService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GalleryController extends Controller
{
    public function __construct(
        private readonly ProfileService $profileService,
    ) {
    }

    public function index(): AnonymousResourceCollection
    {
        return GalleryResource::collection($this->profileService->getGalleries());
    }
}
