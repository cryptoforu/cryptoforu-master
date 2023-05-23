<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Interfaces\Crypto\HandleCoinsContract;
use App\Services\Crypto\Actions\HandleAllCoins;
use App\Services\Crypto\Actions\HandleCategories;
use App\Services\Crypto\CryptoActions;
use App\Services\Crypto\CryptoService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

final class CryptoProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(
            abstract: CryptoService::class,
            concrete: fn () => new CryptoService(Http::coingecko())
        );
        $this->app->bind(
            abstract: HandleCategoriesContract::class,
            concrete: HandleCategories::class,
        );
        $this->app->bind(
            abstract: HandleCoinsContract::class,
            concrete: HandleAllCoins::class,
        );
        $this->app->bind(
            abstract: CryptoActionsInterface::class,
            concrete: CryptoActions::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {

    }
}
