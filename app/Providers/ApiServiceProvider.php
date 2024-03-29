<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\ApiServiceContract;
use App\Services\Api\ApiService;
use Illuminate\Support\ServiceProvider;

final class ApiServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(
            abstract: ApiService::class,
            concrete: fn () => ApiService::make(storage_path('app/api_data.json'))
        );
        $this->app->bind(
            abstract: ApiServiceContract::class,
            concrete: ApiService::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
