<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>{{ $title ?? 'Admin Panel' }} | {{ config('app.name') }}</title>
        @vite('resources/css/app.css')
        <style>
            .admin-shell {
                min-height: 100vh;
                background:
                    radial-gradient(circle at top left, rgba(15, 118, 110, 0.12), transparent 32%),
                    linear-gradient(180deg, #f9f5ee 0%, #f2ede2 100%);
            }

            .admin-grid {
                display: grid;
                grid-template-columns: 260px minmax(0, 1fr);
                gap: 24px;
            }

            .admin-nav-link {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-radius: 999px;
                padding: 0.75rem 1rem;
                color: #4d6768;
                font-weight: 600;
                transition: 0.2s ease;
            }

            .admin-nav-link:hover,
            .admin-nav-link.active {
                background: #102229;
                color: #fff;
            }

            .admin-card {
                border: 1px solid rgba(16, 34, 41, 0.08);
                border-radius: 1.5rem;
                background: rgba(255, 255, 255, 0.82);
                padding: 1.25rem;
            }

            .admin-table {
                width: 100%;
                border-collapse: collapse;
            }

            .admin-table th,
            .admin-table td {
                padding: 0.85rem 1rem;
                border-bottom: 1px solid rgba(16, 34, 41, 0.08);
                text-align: left;
                vertical-align: top;
            }

            .admin-input,
            .admin-select,
            .admin-textarea {
                width: 100%;
                border: 1px solid rgba(16, 34, 41, 0.12);
                border-radius: 1rem;
                background: #fff;
                padding: 0.85rem 1rem;
                color: #102229;
            }

            .admin-textarea {
                min-height: 9rem;
                resize: vertical;
            }

            .admin-label {
                display: block;
                font-size: 0.95rem;
                font-weight: 700;
                color: #102229;
                margin-bottom: 0.5rem;
            }

            @media (max-width: 1024px) {
                .admin-grid {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body class="admin-shell text-ink">
        <div class="mx-auto max-w-7xl px-6 py-6 lg:px-10">
            <div class="admin-grid">
                <aside class="surface-card h-fit px-5 py-5">
                    <div class="mb-6">
                        <p class="font-display text-2xl font-bold tracking-tight">
                            Admin Panel
                        </p>
                        <p class="mt-2 text-sm text-ink-soft">
                            Manage all portfolio content from one place.
                        </p>
                    </div>

                    @php
                        $links = [
                            ['label' => 'Dashboard', 'route' => 'admin.dashboard'],
                            ['label' => 'Profiles', 'route' => 'admin.profiles.index'],
                            ['label' => 'Skills', 'route' => 'admin.skills.index'],
                            ['label' => 'Experiences', 'route' => 'admin.experiences.index'],
                            ['label' => 'Educations', 'route' => 'admin.educations.index'],
                            ['label' => 'Projects', 'route' => 'admin.projects.index'],
                            ['label' => 'Galleries', 'route' => 'admin.galleries.index'],
                            ['label' => 'Social Links', 'route' => 'admin.social-links.index'],
                            ['label' => 'Contacts', 'route' => 'admin.contacts.index'],
                        ];
                    @endphp

                    <nav class="space-y-2">
                        @foreach ($links as $link)
                            <a
                                href="{{ route($link['route']) }}"
                                class="admin-nav-link {{ request()->routeIs(str_replace('.index', '.*', $link['route'])) || request()->routeIs($link['route']) ? 'active' : '' }}"
                            >
                                <span>{{ $link['label'] }}</span>
                            </a>
                        @endforeach
                    </nav>

                    <div class="mt-6 rounded-[1.25rem] border border-black/8 bg-white/80 p-4">
                        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                            Signed in as
                        </p>
                        <p class="mt-2 text-sm font-semibold text-ink">
                            {{ auth()->user()?->name }}
                        </p>
                        <p class="text-sm text-ink-soft">
                            {{ auth()->user()?->email }}
                        </p>
                        <form method="POST" action="{{ route('admin.logout') }}" class="mt-4">
                            @csrf
                            <button type="submit" class="w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">
                                Logout
                            </button>
                        </form>
                    </div>
                </aside>

                <main class="space-y-6">
                    <header class="surface-card px-6 py-5">
                        <div class="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p class="text-sm font-semibold uppercase tracking-[0.26em] text-ink-soft">
                                    {{ $eyebrow ?? 'Administration' }}
                                </p>
                                <h1 class="font-display mt-3 text-4xl font-bold tracking-tight">
                                    {{ $heading ?? 'Admin Panel' }}
                                </h1>
                                @if (! empty($description))
                                    <p class="mt-3 max-w-3xl text-sm leading-7 text-ink-soft">
                                        {{ $description }}
                                    </p>
                                @endif
                            </div>

                            @yield('headerActions')
                        </div>
                    </header>

                    @if (session('status'))
                        <div class="rounded-[1.25rem] border border-accent/20 bg-accent/8 px-4 py-3 text-sm text-accent">
                            {{ session('status') }}
                        </div>
                    @endif

                    @yield('content')
                </main>
            </div>
        </div>
    </body>
</html>
