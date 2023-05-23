<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Earn\EarnActionInterface;
use App\Interfaces\Earn\EarnServiceInterface;
use App\Services\Earn\EarnActions;
use App\Services\Earn\EarnService;
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
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
