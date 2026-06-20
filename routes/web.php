<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/portfolio-details/{slug?}', HomeController::class)->name('portfolio-details');
Route::get('/project-details/{slug?}', HomeController::class)->name('project-details');

require __DIR__.'/admin.php';
