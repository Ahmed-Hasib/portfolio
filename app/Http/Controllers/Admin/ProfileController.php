<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ProfileController extends Controller
{
    public function index(): View
    {
        return view('admin.profiles.index', [
            'profiles' => Profile::query()
                ->orderByDesc('is_active')
                ->orderBy('full_name')
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.profiles.form', [
            'profile' => new Profile(['is_active' => true]),
            'formAction' => route('admin.profiles.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create profile',
            'submitLabel' => 'Create profile',
        ]);
    }

    public function store(UpsertProfileRequest $request): RedirectResponse
    {
        $profile = Profile::query()->create($request->validated());
        $this->enforceSingleActiveProfile($profile);

        return redirect()
            ->route('admin.profiles.index')
            ->with('status', 'Profile created successfully.');
    }

    public function edit(Profile $profile): View
    {
        return view('admin.profiles.form', [
            'profile' => $profile,
            'formAction' => route('admin.profiles.update', $profile),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit profile',
            'submitLabel' => 'Update profile',
        ]);
    }

    public function update(UpsertProfileRequest $request, Profile $profile): RedirectResponse
    {
        $profile->update($request->validated());
        $this->enforceSingleActiveProfile($profile);

        return redirect()
            ->route('admin.profiles.index')
            ->with('status', 'Profile updated successfully.');
    }

    public function destroy(Profile $profile): RedirectResponse
    {
        $profile->delete();

        return redirect()
            ->route('admin.profiles.index')
            ->with('status', 'Profile deleted successfully.');
    }

    private function enforceSingleActiveProfile(Profile $profile): void
    {
        if (! $profile->is_active) {
            return;
        }

        Profile::query()
            ->whereKeyNot($profile->id)
            ->update(['is_active' => false]);
    }
}
