<?php

use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\EducationController;
use App\Http\Controllers\API\ExperienceController;
use App\Http\Controllers\API\GalleryController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\ProjectController;
use App\Http\Controllers\API\SkillController;
use App\Http\Controllers\API\SocialLinkController;
use Illuminate\Support\Facades\Route;

Route::get('/profile', [ProfileController::class, 'show'])->name('api.profile.show');
Route::get('/skills', [SkillController::class, 'index'])->name('api.skills.index');
Route::get('/experiences', [ExperienceController::class, 'index'])->name('api.experiences.index');
Route::get('/educations', [EducationController::class, 'index'])->name('api.educations.index');
Route::get('/projects', [ProjectController::class, 'index'])->name('api.projects.index');
Route::get('/projects/{slug}', [ProjectController::class, 'show'])->name('api.projects.show');
Route::get('/galleries', [GalleryController::class, 'index'])->name('api.galleries.index');
Route::get('/social-links', [SocialLinkController::class, 'index'])->name('api.social-links.index');
Route::post('/contact', [ContactController::class, 'store'])->name('api.contact.store');

Route::get('/portfolio/profile', [ProfileController::class, 'show'])
    ->name('api.portfolio.profile.show');
