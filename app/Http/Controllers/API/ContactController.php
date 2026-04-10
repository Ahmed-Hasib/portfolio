<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Resources\ContactResource;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    public function __construct(
        private readonly ContactService $contactService,
    ) {
    }

    public function store(StoreContactRequest $request): JsonResponse
    {
        return (new ContactResource(
            $this->contactService->submit($request->validated()),
        ))
            ->additional([
                'message' => 'Contact submitted successfully.',
            ])
            ->response()
            ->setStatusCode(201);
    }
}
