<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertGalleryRequest;
use App\Models\Gallery;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class GalleryController extends Controller
{
    public function index(): View
    {
        return view('admin.galleries.index', [
            'galleries' => Gallery::query()->with('profile')->orderBy('sort_order')->orderBy('id')->get(),
        ]);
    }

    public function create(): View
    {
        return view('admin.galleries.form', [
            'gallery' => new Gallery(),
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.galleries.store'),
            'formMethod' => 'POST',
            'formTitle' => 'Create gallery item',
            'submitLabel' => 'Create gallery item',
        ]);
    }

    public function store(UpsertGalleryRequest $request): RedirectResponse
    {
        Gallery::query()->create($this->payload($request));

        return redirect()->route('admin.galleries.index')->with('status', 'Gallery item created successfully.');
    }

    public function edit(Gallery $gallery): View
    {
        return view('admin.galleries.form', [
            'gallery' => $gallery,
            'profiles' => Profile::query()->orderBy('full_name')->get(),
            'formAction' => route('admin.galleries.update', $gallery),
            'formMethod' => 'PUT',
            'formTitle' => 'Edit gallery item',
            'submitLabel' => 'Update gallery item',
        ]);
    }

    public function update(UpsertGalleryRequest $request, Gallery $gallery): RedirectResponse
    {
        $gallery->update($this->payload($request, $gallery));

        return redirect()->route('admin.galleries.index')->with('status', 'Gallery item updated successfully.');
    }

    public function destroy(Gallery $gallery): RedirectResponse
    {
        $this->deleteStoredImage($gallery->image);
        $gallery->delete();

        return redirect()->route('admin.galleries.index')->with('status', 'Gallery item deleted successfully.');
    }

    /**
     * @return array<string, mixed>
     */
    private function payload(UpsertGalleryRequest $request, ?Gallery $gallery = null): array
    {
        $data = $request->safe()->except(['image']);

        if ($request->hasFile('image')) {
            $data['image'] = '/storage/'.$request->file('image')->store('gallery', 'public');

            if ($gallery !== null) {
                $this->deleteStoredImage($gallery->image);
            }
        } elseif ($gallery !== null) {
            $data['image'] = $gallery->image;
        }

        return $data;
    }

    private function deleteStoredImage(?string $imagePath): void
    {
        if ($imagePath === null || ! str_starts_with($imagePath, '/storage/')) {
            return;
        }

        $storagePath = substr($imagePath, strlen('/storage/'));

        if ($storagePath === false || $storagePath === '') {
            return;
        }

        Storage::disk('public')->delete($storagePath);
    }
}
