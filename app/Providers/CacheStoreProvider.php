<?php

declare(strict_types=1);

namespace App\Providers;

use App\Actions\GetSharedProps;
use App\Contracts\SharedPropsContract;
use App\Services\Store\CacheStoreService;
use Illuminate\Support\ServiceProvider;

final class CacheStoreProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(
            abstract: CacheStoreService::class,
            concrete: fn () => CacheStoreService::make(storage_path('app/cache_keys.json')),
        );

        $this->app->bind(
            abstract: SharedPropsContract::class,
            concrete: GetSharedProps::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
