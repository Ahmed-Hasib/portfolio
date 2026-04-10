<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthController extends Controller
{
    public function create(): View
    {
        return view('admin.auth.login');
    }

    public function store(AdminLoginRequest $request): RedirectResponse
    {
        $credentials = $request->safe()->only(['email', 'password']);
        $remember = (bool) $request->boolean('remember');

        if (! Auth::attempt($credentials, $remember)) {
            return back()
                ->withInput($request->except('password'))
                ->withErrors([
                    'email' => 'The provided admin credentials are invalid.',
                ]);
        }

        $request->session()->regenerate();

        return redirect()->route('admin.dashboard');
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
