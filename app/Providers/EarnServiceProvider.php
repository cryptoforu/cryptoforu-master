<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Earn\EarnActionInterface;
use App\Interfaces\Earn\EarnCategoryQueryContract;
use App\Interfaces\Earn\EarnQueryContract;
use App\Interfaces\Earn\EarnServiceInterface;
use App\Services\Earn\EarnActions;
use App\Services\Earn\EarnService;
use App\Services\Earn\Queries\EarnCategoryQuery;
use App\Services\Earn\Queries\EarnQuery;
use Illuminate\Support\ServiceProvider;

final class EarnServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            abstract: EarnServiceInterface::class,
            concrete: EarnService::class,
        );
        $this->app->bind(
            abstract: EarnActionInterface::class,
            concrete: EarnActions::class,
        );
        $this->app->bind(
            abstract: EarnCategoryQueryContract::class,
            concrete: EarnCategoryQuery::class,
        );
        $this->app->bind(
            abstract: EarnQueryContract::class,
            concrete: EarnQuery::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
