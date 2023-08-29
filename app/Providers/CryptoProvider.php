<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Interfaces\Crypto\HandleCoinsContract;
use App\Interfaces\Crypto\HandleExchangesInterface;
use App\Services\Crypto\Actions\HandleAllCoins;
use App\Services\Crypto\Actions\HandleCategories;
use App\Services\Crypto\Actions\HandleExchanges;
use App\Services\Crypto\CryptoActions;
use App\Services\Crypto\CryptoService;
use App\Services\Crypto\Queries\CoinQuery;
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
        $this->app->bind(
            abstract: HandleExchangesInterface::class,
            concrete: HandleExchanges::class,
        );
        $this->app->bind(
            abstract: CoinQueryContract::class,
            concrete: CoinQuery::class
        );
        $this->app->singleton(
            abstract: HandleCategories::class,
            concrete: fn (
            ) => HandleCategories::make(storage_path('app/crypto/categories.json'))
        );
        $this->app->singleton(
            abstract: HandleAllCoins::class,
            concrete: fn (
            ) => HandleAllCoins::make(storage_path('app/crypto/coins.json'))
        );
        $this->app->singleton(
            abstract: HandleExchanges::class,
            concrete: fn (
            ) => HandleExchanges::make(storage_path('app/crypto/exchanges.json'))
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
