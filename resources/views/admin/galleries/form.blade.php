@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Create or update gallery items used in the public portfolio showcase.';
    $currentImage = old('existing_image', $gallery->image);
    $currentDescription = old('description', $gallery->description);
@endphp

@section('content')
    <form method="POST" action="{{ $formAction }}" enctype="multipart/form-data" class="surface-card space-y-5 px-6 py-6">
        @csrf
        @if ($formMethod !== 'POST') @method($formMethod) @endif

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Profile</span>
                <select name="profile_id" class="admin-select" required>
                    <option value="">Select a profile</option>
                    @foreach ($profiles as $profile)
                        <option value="{{ $profile->id }}" @selected((string) old('profile_id', $gallery->profile_id) === (string) $profile->id)>{{ $profile->full_name }}</option>
                    @endforeach
                </select>
            </label>
            <label>
                <span class="admin-label">Title</span>
                <input type="text" name="title" value="{{ old('title', $gallery->title) }}" class="admin-input">
            </label>
        </div>

        <div>
            <span class="admin-label">Description</span>
            <div class="rounded-[1.25rem] border border-black/8 bg-white/75 p-4">
                <div class="editor-toolbar">
                    <button type="button" class="editor-toolbar-button" data-editor-command="bold">Bold</button>
                    <button type="button" class="editor-toolbar-button" data-editor-command="italic">Italic</button>
                    <button type="button" class="editor-toolbar-button" data-editor-command="insertUnorderedList">Bullets</button>
                    <button type="button" class="editor-toolbar-button" data-editor-command="insertOrderedList">Numbers</button>
                    <button type="button" class="editor-toolbar-button" data-editor-command="createLink">Link</button>
                    <button type="button" class="editor-toolbar-button" data-editor-command="removeFormat">Clear format</button>
                </div>

                <div
                    id="gallery-description-editor"
                    class="editor-canvas"
                    contenteditable="true"
                    data-placeholder="Write a short description for this gallery item."
                ></div>

                <textarea id="gallery-description-input" name="description" class="sr-only">{{ $currentDescription }}</textarea>

                @error('description')
                    <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span>
                @enderror

                <span class="mt-3 block text-xs text-ink-soft">
                    This content appears on the public gallery card. Paragraphs, emphasis, lists, and links are supported.
                </span>
            </div>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <div class="md:col-span-2">
                <label>
                    <span class="admin-label">Upload image</span>
                    <input
                        id="gallery-image-input"
                        type="file"
                        name="image"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        class="admin-input"
                        {{ $formMethod === 'POST' ? 'required' : '' }}
                    >
                </label>
                @error('image')
                    <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span>
                @enderror
                <span class="mt-2 block text-xs text-ink-soft">
                    Upload JPG, PNG, WebP, or AVIF. Max size 5MB.
                </span>
            </div>
            <label>
                <span class="admin-label">Category</span>
                <input type="text" name="category" value="{{ old('category', $gallery->category) }}" class="admin-input">
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-[220px_1fr]">
            <div>
                <span class="admin-label">Preview</span>
                <div class="overflow-hidden rounded-[1.25rem] border border-black/8 bg-white/80 p-3">
                    <img
                        id="gallery-image-preview"
                        src="{{ $currentImage ? (str_starts_with($currentImage, 'http') ? $currentImage : asset(ltrim($currentImage, '/'))) : 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22180%22 viewBox=%220 0 240 180%22><rect width=%22240%22 height=%22180%22 rx=%2224%22 fill=%22%23f4ede1%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%234d6768%22 font-family=%22Arial%22 font-size=%2214%22>Preview unavailable</text></svg>' }}"
                        alt="Gallery preview"
                        class="h-44 w-full rounded-[1rem] object-cover"
                    >
                </div>
                @if ($gallery->image)
                    <p class="mt-3 break-all text-xs leading-6 text-ink-soft">
                        Current file: {{ $gallery->image }}
                    </p>
                @endif
            </div>

            <div class="space-y-5">
                <label>
                    <span class="admin-label">Sort order</span>
                    <input type="number" name="sort_order" value="{{ old('sort_order', $gallery->sort_order ?? 0) }}" class="admin-input" min="0">
                </label>
            </div>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.galleries.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>

    <script>
        (() => {
            const input = document.getElementById('gallery-image-input');
            const preview = document.getElementById('gallery-image-preview');
            const editor = document.getElementById('gallery-description-editor');
            const descriptionInput = document.getElementById('gallery-description-input');
            const toolbarButtons = document.querySelectorAll('[data-editor-command]');

            if (!input || !preview) {
                return;
            }

            if (editor && descriptionInput) {
                editor.innerHTML = descriptionInput.value || '';

                const syncDescription = () => {
                    descriptionInput.value = editor.innerHTML.trim();
                };

                editor.addEventListener('input', syncDescription);
                editor.addEventListener('blur', syncDescription);

                toolbarButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const command = button.dataset.editorCommand;

                        if (!command) {
                            return;
                        }

                        if (command === 'createLink') {
                            const url = window.prompt('Enter the link URL');

                            if (!url) {
                                return;
                            }

                            document.execCommand(command, false, url);
                        } else {
                            document.execCommand(command, false, null);
                        }

                        syncDescription();
                        editor.focus();
                    });
                });
            }

            input.addEventListener('change', (event) => {
                const [file] = event.target.files ?? [];

                if (!file) {
                    return;
                }

                const reader = new FileReader();

                reader.addEventListener('load', () => {
                    preview.src = reader.result;
                });

                reader.readAsDataURL(file);
            });
        })();
    </script>
@endsection
