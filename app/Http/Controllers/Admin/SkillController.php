<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertSkillRequest;
use App\Models\Profile;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class SkillController extends Controller
{
    public function index(): View
    {
        return view('admin.skills.index', [
            'skills' => Skill::query()->with('profile')->orderBy('sort_order')->orderBy('name')->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.skills.form', [
            'skill' => new Skill(),
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.skills.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create skill',
            'submitLabel' => 'Create skill',
        ]);
    }

    public function store(UpsertSkillRequest $request): RedirectResponse
    {
        Skill::query()->create($request->validated());

        return redirect()->route('admin.skills.index')->with('status', 'Skill created successfully.');
    }

    public function edit(Skill $skill): View
    {
        return view('admin.skills.form', [
            'skill' => $skill,
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.skills.update', $skill),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit skill',
            'submitLabel' => 'Update skill',
        ]);
    }

    public function update(UpsertSkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill->update($request->validated());

        return redirect()->route('admin.skills.index')->with('status', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return redirect()->route('admin.skills.index')->with('status', 'Skill deleted successfully.');
    }
}
