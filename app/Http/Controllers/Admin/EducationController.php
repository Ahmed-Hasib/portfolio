<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertEducationRequest;
use App\Models\Education;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class EducationController extends Controller
{
    public function index(): View
    {
        return view('admin.educations.index', [
            'educations' => Education::query()
                ->with('profile')
                ->orderByDesc('start_year')
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.educations.form', [
            'education' => new Education(),
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.educations.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create education entry',
            'submitLabel' => 'Create education',
        ]);
    }

    public function store(UpsertEducationRequest $request): RedirectResponse
    {
        Education::query()->create($request->validated());

        return redirect()->route('admin.educations.index')->with('status', 'Education entry created successfully.');
    }

    public function edit(Education $education): View
    {
        return view('admin.educations.form', [
            'education' => $education,
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.educations.update', $education),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit education entry',
            'submitLabel' => 'Update education',
        ]);
    }

    public function update(UpsertEducationRequest $request, Education $education): RedirectResponse
    {
        $education->update($request->validated());

        return redirect()->route('admin.educations.index')->with('status', 'Education entry updated successfully.');
    }

    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return redirect()->route('admin.educations.index')->with('status', 'Education entry deleted successfully.');
    }
}
