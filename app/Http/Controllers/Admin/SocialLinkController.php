<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertSocialLinkRequest;
use App\Models\Profile;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class SocialLinkController extends Controller
{
    public function index(): View
    {
        return view('admin.social-links.index', [
            'socialLinks' => SocialLink::query()->with('profile')->orderBy('display_order')->orderBy('platform_name')->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.social-links.form', [
            'socialLink' => new SocialLink(),
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.social-links.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create social link',
            'submitLabel' => 'Create social link',
        ]);
    }

    public function store(UpsertSocialLinkRequest $request): RedirectResponse
    {
        SocialLink::query()->create($request->validated());

        return redirect()->route('admin.social-links.index')->with('status', 'Social link created successfully.');
    }

    public function edit(SocialLink $social_link): View
    {
        return view('admin.social-links.form', [
            'socialLink' => $social_link,
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.social-links.update', $social_link),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit social link',
            'submitLabel' => 'Update social link',
        ]);
    }

    public function update(UpsertSocialLinkRequest $request, SocialLink $social_link): RedirectResponse
    {
        $social_link->update($request->validated());

        return redirect()->route('admin.social-links.index')->with('status', 'Social link updated successfully.');
    }

    public function destroy(SocialLink $social_link): RedirectResponse
    {
        $social_link->delete();

        return redirect()->route('admin.social-links.index')->with('status', 'Social link deleted successfully.');
    }
}
