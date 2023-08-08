<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Faucetpay\GetFaucetsStatsContract;
use App\Interfaces\Faucetpay\ListUpdateOrCreateContract;
use App\Services\Faucetpay\Actions\GetFaucetsStats;
use App\Services\Faucetpay\Actions\UpdateOrCreateFaucets;
use App\Services\Faucetpay\FaucetPayService;
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
      concrete: fn() => new FaucetPayService(
        client: Http::faucetpay(),
        cache: new ApiCacheService(['faucetpay', 'list'])
      )
    );

    $this->app->bind(
      abstract: FaucetPayServiceInterface::class,
      concrete: FaucetPayService::class
    );

    $this->app->bind(
      abstract: ListUpdateOrCreateContract::class,
      concrete: UpdateOrCreateFaucets::class
    );

    $this->app->bind(
      abstract: GetFaucetsStatsContract::class,
      concrete: GetFaucetsStats::class
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
