<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertProfileRequest;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
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
        $profile = Profile::query()->create($this->payload($request));
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
        $profile->update($this->payload($request, $profile));
        $this->enforceSingleActiveProfile($profile);

        return redirect()
            ->route('admin.profiles.index')
            ->with('status', 'Profile updated successfully.');
    }

    public function destroy(Profile $profile): RedirectResponse
    {
        $this->deleteStoredAsset($profile->profile_image);
        $this->deleteStoredAsset($profile->resume_url);
        $profile->delete();

        return redirect()
            ->route('admin.profiles.index')
            ->with('status', 'Profile deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(UpsertProfileRequest $request, ?Profile $profile = null): array
    {
        $data = $request->safe()->except(['profile_image_file', 'resume_file']);
        $data['bio'] = $this->sanitizeRichText($data['bio'] ?? null);

        if ($request->hasFile('profile_image_file')) {
            $data['profile_image'] = '/storage/'.$request->file('profile_image_file')->store('profile', 'public');

            if ($profile !== null) {
                $this->deleteStoredAsset($profile->profile_image);
            }
        } elseif ($profile !== null) {
            $data['profile_image'] = $profile->profile_image;
        }

        if ($request->hasFile('resume_file')) {
            $data['resume_url'] = '/storage/'.$request->file('resume_file')->store('cv', 'public');

            if ($profile !== null) {
                $this->deleteStoredAsset($profile->resume_url);
            }
        } elseif ($profile !== null) {
            $data['resume_url'] = $profile->resume_url;
        }

        return $data;
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

    private function deleteStoredAsset(?string $assetPath): void
    {
        if ($assetPath === null || ! str_starts_with($assetPath, '/storage/')) {
            return;
        }

        $storagePath = substr($assetPath, strlen('/storage/'));

        if ($storagePath === false || $storagePath === '') {
            return;
        }

        Storage::disk('public')->delete($storagePath);
    }

    private function sanitizeRichText(?string $value): ?string
    {
        if ($value === null) {
            return null;
        }

        $sanitized = trim(strip_tags($value, '<p><br><strong><em><ul><ol><li><a><blockquote>'));

        return $sanitized !== '' ? $sanitized : null;
    }
}
