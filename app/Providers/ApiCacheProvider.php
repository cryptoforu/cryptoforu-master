<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Api\Blog\CategoryApiController;
use App\Http\Controllers\Api\Blog\PostApiController;
use App\Http\Controllers\Api\Crypto\CryptoResourceController;
use App\Http\Controllers\Api\Earn\EarnCategoryResourceController;
use App\Http\Controllers\Api\FaucetPay\ListController;
use App\Services\Blog\Queries\SharedQueries;
use App\Services\Store\ApiCacheService;
use Illuminate\Support\ServiceProvider;

final class ApiCacheProvider extends ServiceProvider
{
  /**
   * Register services.
   */
  public function register(): void
  {
    $this->app->bind(
      abstract: ApiCacheContract::class,
      concrete: ApiCacheService::class
    );
    $this->app->when(
      concrete: [
        PostApiController::class,
        CategoryApiController::class,
        SharedQueries::class
      ]
    )->needs(
      abstract: ApiCacheContract::class
    )->give(fn() => new ApiCacheService(['blog', 'api']));
    $this->app->when(
      CryptoResourceController::class
    )->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['crypto', 'data']));
    $this->app->when(
      EarnCategoryResourceController::class
    )->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['earn', 'categories']));
    $this->app->when(
      ListController::class
    )->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['list', 'data']));
  }

  /**
   * Bootstrap services.
   */
  public function boot(): void
  {
  }
}
