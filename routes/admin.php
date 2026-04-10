<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\ProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\SocialLinkController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::redirect('/', '/admin/dashboard');

    Route::middleware('guest')->group(function (): void {
        Route::get('/login', [AuthController::class, 'create'])->name('login');
        Route::post('/login', [AuthController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth')->group(function (): void {
        Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
        Route::get('/dashboard', DashboardController::class)->name('dashboard');

        Route::resource('profiles', ProfileController::class)->except(['show']);
        Route::resource('skills', SkillController::class)->except(['show']);
        Route::resource('experiences', ExperienceController::class)->except(['show']);
        Route::resource('educations', EducationController::class)->except(['show']);
        Route::resource('projects', ProjectController::class)->except(['show']);
        Route::resource('galleries', GalleryController::class)->except(['show']);
        Route::resource('social-links', SocialLinkController::class)->except(['show']);
        Route::resource('contacts', ContactController::class)->except(['show']);
    });
});
