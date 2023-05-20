<?php

declare (strict_types = 1);

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->register(
            provider:SettingsProvider::class
        );
        $this->app->register(
            provider:LibraryProvider::class
        );
        $this->app->register(
            provider:BlogProvider::class
        );
        $this->app->register(
            provider:EarnServiceProvider::class,
        );
        $this->app->register(
            provider:CacheStoreProvider::class,
        );
        $this->app->register(
            provider:FrontEndProvider::class,
        );
        $this->app->register(
            provider:SiteProvider::class,
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
    }
}
