<?php

namespace App\Providers;

use App\Interfaces\PortfolioProfileRepositoryInterface;
use App\Repositories\PortfolioProfileRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            PortfolioProfileRepositoryInterface::class,
            PortfolioProfileRepository::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
