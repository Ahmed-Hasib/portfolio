<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ParsesTextareaLines;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertProjectRequest;
use App\Models\Profile;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ProjectController extends Controller
{
    use ParsesTextareaLines;

    public function index(): View
    {
        return view('admin.projects.index', [
            'projects' => Project::query()
                ->with('profile')
                ->orderByDesc('featured')
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.projects.form', [
            'project' => new Project(['featured' => false]),
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.projects.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create project',
            'submitLabel' => 'Create project',
            'techStackText' => '',
        ]);
    }

    public function store(UpsertProjectRequest $request): RedirectResponse
    {
        Project::query()->create($this->payload($request->validated()));

        return redirect()->route('admin.projects.index')->with('status', 'Project created successfully.');
    }

    public function edit(Project $project): View
    {
        return view('admin.projects.form', [
            'project' => $project,
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.projects.update', $project),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit project',
            'submitLabel' => 'Update project',
            'techStackText' => implode(PHP_EOL, $project->tech_stack ?? []),
        ]);
    }

    public function update(UpsertProjectRequest $request, Project $project): RedirectResponse
    {
        $project->update($this->payload($request->validated()));

        return redirect()->route('admin.projects.index')->with('status', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return redirect()->route('admin.projects.index')->with('status', 'Project deleted successfully.');
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function payload(array $data): array
    {
        $data['tech_stack'] = $this->parseLines($data['tech_stack'] ?? null);

        return $data;
    }
}
