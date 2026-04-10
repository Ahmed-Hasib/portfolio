<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Admin Login | {{ config('app.name') }}</title>
        @vite('resources/css/app.css')
        <style>
            .login-input {
                width: 100%;
                border: 1px solid rgba(16, 34, 41, 0.12);
                border-radius: 1rem;
                background: #fff;
                padding: 0.85rem 1rem;
                color: #102229;
            }
        </style>
    </head>
    <body class="min-h-screen bg-shell text-ink">
        <div class="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-8 lg:px-10">
            <div class="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div class="surface-card px-8 py-10">
                    <p class="section-label">Admin Access</p>
                    <h1 class="font-display mt-6 text-5xl font-bold tracking-tight">
                        Sign in to manage the portfolio.
                    </h1>
                    <p class="mt-5 text-base leading-8 text-ink-soft">
                        This panel controls profiles, skills, experiences,
                        projects, galleries, social links, and contact
                        submissions.
                    </p>
                    <div class="mt-8 rounded-[1.5rem] border border-black/8 bg-white/78 p-5">
                        <p class="text-sm font-semibold text-ink">Seeded admin user supported</p>
                        <p class="mt-2 text-sm text-ink-soft">
                            The initial admin account is created through the database seeder so deployment and local setup stay consistent.
                        </p>
                    </div>
                </div>

                <div class="surface-card px-8 py-10">
                    <h2 class="font-display text-3xl font-bold tracking-tight">
                        Admin Login
                    </h2>

                    <form method="POST" action="{{ route('admin.login.store') }}" class="mt-8 space-y-5">
                        @csrf

                        <label class="block">
                            <span class="admin-label">Email</span>
                            <input
                                type="email"
                                name="email"
                                value="{{ old('email') }}"
                                class="login-input"
                                required
                                autofocus
                            >
                            @error('email')
                                <span class="mt-2 block text-sm text-accent-warm">{{ $message }}</span>
                            @enderror
                        </label>

                        <label class="block">
                            <span class="admin-label">Password</span>
                            <input
                                type="password"
                                name="password"
                                class="login-input"
                                required
                            >
                        </label>

                        <label class="flex items-center gap-3 text-sm text-ink-soft">
                            <input type="checkbox" name="remember" value="1">
                            <span>Keep me signed in on this device</span>
                        </label>

                        <button type="submit" class="w-full rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html>
