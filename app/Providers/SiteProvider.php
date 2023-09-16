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
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            abstract: StoreDataContract::class,
            concrete: StoreSiteData::class
        );

        $this->app->bind(
            abstract: SiteInterface::class,
            concrete: SiteService::class
        );

        $this->app->bind(
            abstract: DeleteDataContract::class,
            concrete: DeleteSiteData::class
        );

        $this->app->bind(
            abstract: SocialLinksContract::class,
            concrete: GetSocialLinks::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
