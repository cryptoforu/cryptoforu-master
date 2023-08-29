<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Faucetpay\FaucetListCategoryContract;
use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Faucetpay\GetFaucetsStatsContract;
use App\Interfaces\Faucetpay\HandleListContract;
use App\Services\Faucetpay\Actions\GetFaucetsStats;
use App\Services\Faucetpay\Actions\HandleList;
use App\Services\Faucetpay\FaucetPayService;
use App\Services\Faucetpay\Queries\FaucetListCategoryQuery;
use App\Services\Store\ApiCacheService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\ServiceProvider;

class FaucetPayProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(
            abstract: FaucetPayService::class,
            concrete: fn () => new FaucetPayService(
                cache: new ApiCacheService(['faucetpay', 'list']),
                client: Http::faucetpay()
            )
        );
        $this->app->bind(
            abstract: FaucetPayServiceInterface::class,
            concrete: FaucetPayService::class
        );

        $this->app->bind(
            abstract: GetFaucetsStatsContract::class,
            concrete: GetFaucetsStats::class
        );
        $this->app->bind(
            abstract: HandleListContract::class,
            concrete: HandleList::class
        );
        $this->app->singleton(
            abstract: HandleList::class,
            concrete: fn (
            ) => HandleList::make(storage_path('app/list/list_data.json'))
        );
        $this->app->bind(
            abstract: FaucetListCategoryContract::class,
            concrete: FaucetListCategoryQuery::class
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Http::macro('faucetpay', function () {
            return Http::baseUrl(config('services.faucet-pay.base_url'))->withHeaders([
                'api_key' => config('services.faucet-pay.api_key'),
            ])->throw()->acceptJson();
        });
    }
}
