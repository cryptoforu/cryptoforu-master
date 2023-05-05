<?php

namespace App\Providers;

use App\Contracts\CacheStoreContract;
use App\Services\Blog\BlogService;
use App\Services\Earn\EarnActions;
use App\Services\Earn\EarnService;
use App\Services\FrontEnd\FrontEndService;
use App\Services\Library\LibraryResource;
use App\Services\Settings\Menu\MenuResources;
use App\Services\Settings\SettingsAction;
use App\Services\Settings\SettingsService;
use App\Services\Store\CacheStoreService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Spatie\Valuestore\Valuestore;

class CacheStoreProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            abstract :CacheStoreContract::class,
            concrete:CacheStoreService::class,
        );

        $this->app->when([EarnService::class, EarnActions::class])->needs(
            CacheStoreContract::class
        )->give(function () {
            return new CacheStoreService(
                Cache::store('earn'),
                Valuestore::make(storage_path('app/store/earn/earn-data.json'))
            );
        });

        $this->app->when([SettingsAction::class, SettingsService::class, MenuResources::class])
            ->needs(
                CacheStoreContract::class
            )->give(function () {
            return new CacheStoreService(
                Cache::store('settings'),
                Valuestore::make(storage_path('app/store/settings/settings-data.json'))
            );
        });

        $this->app->when(BlogService::class)->needs(
            CacheStoreContract::class,
        )->give(function () {
            return new CacheStoreService(
                Cache::store('blog'),
                Valuestore::make(storage_path('app/store/blog/blog-data.json'))
            );
        });

        $this->app->when(LibraryResource::class)->needs(
            CacheStoreContract::class,
        )->give(function () {
            return new CacheStoreService(
                Cache::store('library'),
                Valuestore::make(storage_path('app/store/library/library-data.json'))
            );
        });

        $this->app->when(FrontEndService::class)->needs(
            CacheStoreContract::class,
        )->give(function () {
            return new CacheStoreService(
                store:Cache::store('frontend'),
                valuestore:Valuestore::make(storage_path('app/store/library/front-data.json'))
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
