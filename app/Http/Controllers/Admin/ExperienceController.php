<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ParsesTextareaLines;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertExperienceRequest;
use App\Models\Experience;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ExperienceController extends Controller
{
    use ParsesTextareaLines;

    public function index(): View
    {
        return view('admin.experiences.index', [
            'experiences' => Experience::query()
                ->with(['profile', 'jobDescriptions'])
                ->orderByDesc('start_date')
                ->orderBy('sort_order')
                ->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.experiences.form', [
            'experience' => new Experience(['is_current' => false]),
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.experiences.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create experience',
            'submitLabel' => 'Create experience',
            'technologiesText' => '',
            'achievementsText' => '',
            'jobDescriptionsText' => '',
        ]);
    }

    public function store(UpsertExperienceRequest $request): RedirectResponse
    {
        $experience = Experience::query()->create($this->payload($request->validated()));
        $this->syncJobDescriptions($experience, $request->input('job_descriptions'));

        return redirect()->route('admin.experiences.index')->with('status', 'Experience created successfully.');
    }

    public function edit(Experience $experience): View
    {
        $experience->load('jobDescriptions');

        return view('admin.experiences.form', [
            'experience' => $experience,
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.experiences.update', $experience),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit experience',
            'submitLabel' => 'Update experience',
            'technologiesText' => implode(PHP_EOL, $experience->technologies_used ?? []),
            'achievementsText' => implode(PHP_EOL, $experience->achievements ?? []),
            'jobDescriptionsText' => $experience->jobDescriptions->pluck('description')->implode(PHP_EOL),
        ]);
    }

    public function update(UpsertExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $experience->update($this->payload($request->validated()));
        $this->syncJobDescriptions($experience, $request->input('job_descriptions'));

        return redirect()->route('admin.experiences.index')->with('status', 'Experience updated successfully.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return redirect()->route('admin.experiences.index')->with('status', 'Experience deleted successfully.');
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    private function payload(array $data): array
    {
        if ($data['is_current'] ?? false) {
            $data['end_date'] = null;
        }

        $data['technologies_used'] = $this->parseLines($data['technologies_used'] ?? null);
        $data['achievements'] = $this->parseLines($data['achievements'] ?? null);

        unset($data['job_descriptions']);

        return $data;
    }

    private function syncJobDescriptions(Experience $experience, ?string $value): void
    {
        $experience->jobDescriptions()->delete();

        $rows = collect($this->parseLines($value))
            ->values()
            ->map(fn (string $description, int $index): array => [
                'description' => $description,
                'sort_order' => $index + 1,
            ])
            ->all();

        if ($rows !== []) {
            $experience->jobDescriptions()->createMany($rows);
        }
    }
}
