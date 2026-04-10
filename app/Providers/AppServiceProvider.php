<?php

namespace App\Providers;

use App\Interfaces\ContactRepositoryInterface;
use App\Interfaces\ProfileRepositoryInterface;
use App\Repositories\ContactRepository;
use App\Repositories\ProfileRepository;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            ProfileRepositoryInterface::class,
            ProfileRepository::class,
        );

        $this->app->bind(
            ContactRepositoryInterface::class,
            ContactRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (! $this->app->runningInConsole() && config('portfolio.security.force_https')) {
            URL::forceScheme('https');
        }
    }
}
