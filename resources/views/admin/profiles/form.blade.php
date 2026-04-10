@extends('admin.layouts.app')

@php
    $title = $formTitle;
    $eyebrow = 'Content';
    $heading = $formTitle;
    $description = 'Create or update the main public profile that powers the portfolio frontend.';
    $currentImage = old('existing_profile_image', $profile->profile_image);
    $currentResume = old('existing_resume_url', $profile->resume_url);
    $currentBio = old('bio', $profile->bio);
@endphp

@section('content')
    <form method="POST" action="{{ $formAction }}" enctype="multipart/form-data" class="surface-card space-y-5 px-6 py-6">
        @csrf
        @if ($formMethod !== 'POST')
            @method($formMethod)
        @endif

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Full name</span>
                <input type="text" name="full_name" value="{{ old('full_name', $profile->full_name) }}" class="admin-input" required>
                @error('full_name') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
            </label>

            <label>
                <span class="admin-label">Designation</span>
                <input type="text" name="designation" value="{{ old('designation', $profile->designation) }}" class="admin-input" required>
                @error('designation') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
            </label>
        </div>

        <div>
            <span class="admin-label">Bio</span>
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
                    id="profile-bio-editor"
                    class="editor-canvas"
                    contenteditable="true"
                    data-placeholder="Write the public profile bio shown on the portfolio homepage."
                ></div>

                <textarea id="profile-bio-input" name="bio" class="sr-only">{{ $currentBio }}</textarea>

                @error('bio') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror

                <span class="mt-3 block text-xs text-ink-soft">
                    Paragraphs, emphasis, lists, and links are supported. This content is used in the public About section.
                </span>
            </div>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Location</span>
                <input type="text" name="location" value="{{ old('location', $profile->location) }}" class="admin-input">
            </label>
            <label>
                <span class="admin-label">Email</span>
                <input type="email" name="email" value="{{ old('email', $profile->email) }}" class="admin-input">
            </label>
        </div>

        <div class="grid gap-5 md:grid-cols-2">
            <label>
                <span class="admin-label">Phone</span>
                <input type="text" name="phone" value="{{ old('phone', $profile->phone) }}" class="admin-input">
                @error('phone') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
            </label>
            <label class="flex items-center gap-3 pt-8 text-sm font-semibold text-ink">
                <input type="checkbox" name="is_active" value="1" {{ old('is_active', $profile->is_active) ? 'checked' : '' }}>
                <span>Set as active public profile</span>
            </label>
        </div>

        <div class="grid gap-5 lg:grid-cols-[240px_1fr]">
            <div>
                <span class="admin-label">Profile image</span>
                <div class="overflow-hidden rounded-[1.25rem] border border-black/8 bg-white/80 p-3">
                    <img
                        id="profile-image-preview"
                        src="{{ $currentImage ? (str_starts_with($currentImage, 'http') ? $currentImage : asset(ltrim($currentImage, '/'))) : 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22240%22 height=%22280%22 viewBox=%220 0 240 280%22><rect width=%22240%22 height=%22280%22 rx=%2224%22 fill=%22%23f4ede1%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%234d6768%22 font-family=%22Arial%22 font-size=%2214%22>No image uploaded</text></svg>' }}"
                        alt="Profile image preview"
                        class="h-72 w-full rounded-[1rem] object-cover"
                    >
                </div>
                @if ($profile->profile_image)
                    <p class="mt-3 break-all text-xs leading-6 text-ink-soft">
                        Current image: {{ $profile->profile_image }}
                    </p>
                @endif
            </div>

            <div class="space-y-5">
                <label>
                    <span class="admin-label">Upload profile image</span>
                    <input
                        id="profile-image-input"
                        type="file"
                        name="profile_image_file"
                        accept="image/png,image/jpeg,image/webp,image/avif"
                        class="admin-input"
                    >
                    @error('profile_image_file') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
                    <span class="mt-2 block text-xs text-ink-soft">
                        Upload JPG, PNG, WebP, or AVIF. Max size 5MB.
                    </span>
                </label>

                <div class="rounded-[1.25rem] border border-black/8 bg-white/80 p-5">
                    <span class="admin-label">Resume / CV</span>
                    <label>
                        <input
                            id="resume-file-input"
                            type="file"
                            name="resume_file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            class="admin-input"
                        >
                    </label>
                    @error('resume_file') <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span> @enderror
                    <p id="resume-file-name" class="mt-3 text-sm text-ink-soft">
                        @if ($currentResume)
                            Current file:
                            <a href="{{ str_starts_with($currentResume, 'http') ? $currentResume : asset(ltrim($currentResume, '/')) }}" target="_blank" rel="noreferrer" class="font-semibold text-accent underline underline-offset-4">
                                {{ basename($currentResume) }}
                            </a>
                        @else
                            No resume uploaded yet.
                        @endif
                    </p>
                    <span class="mt-2 block text-xs text-ink-soft">
                        Upload PDF, DOC, or DOCX. Max size 10MB.
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap gap-3 pt-2">
            <button type="submit" class="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">{{ $submitLabel }}</button>
            <a href="{{ route('admin.profiles.index') }}" class="rounded-full border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-ink">Cancel</a>
        </div>
    </form>

    <script>
        (() => {
            const editor = document.getElementById('profile-bio-editor');
            const bioInput = document.getElementById('profile-bio-input');
            const toolbarButtons = document.querySelectorAll('[data-editor-command]');
            const imageInput = document.getElementById('profile-image-input');
            const imagePreview = document.getElementById('profile-image-preview');
            const resumeInput = document.getElementById('resume-file-input');
            const resumeFileName = document.getElementById('resume-file-name');

            if (editor && bioInput) {
                editor.innerHTML = bioInput.value || '';

                const syncBio = () => {
                    bioInput.value = editor.innerHTML.trim();
                };

                editor.addEventListener('input', syncBio);
                editor.addEventListener('blur', syncBio);

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

                        syncBio();
                        editor.focus();
                    });
                });
            }

            if (imageInput && imagePreview) {
                imageInput.addEventListener('change', (event) => {
                    const [file] = event.target.files ?? [];

                    if (!file) {
                        return;
                    }

                    const reader = new FileReader();

                    reader.addEventListener('load', () => {
                        imagePreview.src = reader.result;
                    });

                    reader.readAsDataURL(file);
                });
            }

            if (resumeInput && resumeFileName) {
                resumeInput.addEventListener('change', (event) => {
                    const [file] = event.target.files ?? [];

                    if (!file) {
                        return;
                    }

                    resumeFileName.textContent = `Selected file: ${file.name}`;
                });
            }
        })();
    </script>
@endsection
