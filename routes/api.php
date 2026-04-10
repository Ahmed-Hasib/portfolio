<?php

use App\Http\Controllers\API\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('portfolio')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])
        ->name('api.portfolio.profile.show');
});
