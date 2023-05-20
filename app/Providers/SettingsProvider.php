<?php

declare (strict_types = 1);

namespace App\Providers;

use App\Interfaces\Settings\ActionContracts\StoreMenuItemContract;
use App\Interfaces\Settings\ActionContracts\UpdateMenuItemContract;
use App\Interfaces\Settings\MenuInterface;
use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Settings\SettingsActionInterface;
use App\Interfaces\Settings\SettingsInterface;
use App\Services\Settings\Menu\Actions\StoreMenuItems;
use App\Services\Settings\Menu\Actions\UpdateMenuItems;
use App\Services\Settings\Menu\MenuResources;
use App\Services\Settings\Page\PageResource;
use App\Services\Settings\SettingsAction;
use App\Services\Settings\SettingsResources;
use App\Services\Settings\SettingsService;
use Illuminate\Support\ServiceProvider;

class SettingsProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(
            abstract :SettingsResources::class,
            concrete:fn() => SettingsResources::make(storage_path('app/settings.json'))
        );

        $this->app->bind(
            abstract :UpdateMenuItemContract::class,
            concrete:UpdateMenuItems::class,
        );

        $this->app->bind(
            abstract :SettingsInterface::class,
            concrete:SettingsService::class
        );

        $this->app->bind(
            abstract :MenuInterface::class,
            concrete:MenuResources::class
        );

        $this->app->bind(
            abstract :PageInterface::class,
            concrete:PageResource::class
        );
        $this->app->bind(
            abstract :SettingsActionInterface::class,
            concrete:SettingsAction::class
        );
        $this->app->bind(
            StoreMenuItemContract::class,
            StoreMenuItems::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
