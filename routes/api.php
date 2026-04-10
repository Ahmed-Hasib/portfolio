<?php

use App\Http\Controllers\API\PortfolioProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('portfolio')->group(function () {
    Route::get('/profile', [PortfolioProfileController::class, 'show'])
        ->name('api.portfolio.profile.show');
});
