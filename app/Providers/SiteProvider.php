<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\CacheStoreContract;
use App\Interfaces\Site\DeleteDataContract;
use App\Interfaces\Site\SiteInterface;
use App\Interfaces\Site\SocialLinksContract;
use App\Interfaces\Site\StoreDataContract;
use App\Services\Site\Actions\DeleteSiteData;
use App\Services\Site\Actions\StoreSiteData;
use App\Services\Site\Queries\GetSocialLinks;
use App\Services\Site\SiteService;
use App\Services\Store\CacheStoreService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\ServiceProvider;
use Spatie\Valuestore\Valuestore;

final class SiteProvider extends ServiceProvider
{
    public $bindings = [
        StoreDataContract::class => StoreSiteData::class,
        SiteInterface::class => SiteService::class,
        DeleteDataContract::class => DeleteSiteData::class,
        SocialLinksContract::class => GetSocialLinks::class,
    ];

    /**
     * Register services.
     */
    public function register(): void
    {

        $this->app->when(
            SiteService::class
        )->needs(
            CacheStoreContract::class,
        )->give(function () {
            return new CacheStoreService(
                store: Cache::store('site'),
                valuestore: Valuestore::make(storage_path('app/site_data.json'))
            );
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
