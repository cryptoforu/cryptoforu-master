<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\CountActionContract;
use App\Services\Api\Resources\CountActions;
use Illuminate\Support\ServiceProvider;

class ViewsCounterProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {

        $this->app->bind(
            abstract: CountActionContract::class,
            concrete: CountActions::class
        );
        $this->app->singleton(
            abstract: CountActions::class,
            concrete: fn () => CountActions::make(storage_path('app/views_count.json'))
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
