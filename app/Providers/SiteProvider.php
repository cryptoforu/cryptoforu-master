<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Site\DeleteDataContract;
use App\Interfaces\Site\SiteInterface;
use App\Interfaces\Site\SocialLinksContract;
use App\Interfaces\Site\StoreDataContract;
use App\Services\Site\Actions\DeleteSiteData;
use App\Services\Site\Actions\StoreSiteData;
use App\Services\Site\Queries\GetSocialLinks;
use App\Services\Site\SiteService;
use Illuminate\Support\ServiceProvider;

final class SiteProvider extends ServiceProvider
{
    public array $bindings = [
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
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
