<?php

declare(strict_types=1);

namespace App\Providers;

use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Api\Blog\CategoryApiController;
use App\Http\Controllers\Api\Blog\PostsApiController;
use App\Http\Controllers\Api\Crypto\CryptoResourceController;
use App\Http\Controllers\Api\Earn\EarnCategoryResourceController;
use App\Http\Controllers\Api\MetaDataController;
use App\Http\Controllers\Api\NavigationDataController;
use App\Http\Controllers\Api\Site\HomeResourceController;
use App\Services\Store\ApiCacheService;
use Illuminate\Support\ServiceProvider;

class ApiCacheProvider extends ServiceProvider
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

    $this->app->when(PostsApiController::class)
      ->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['apiPosts']));
    $this->app->when(CategoryApiController::class)
      ->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['category', 'data']));

    $this->app->when(
      CryptoResourceController::class
    )->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['crypto', 'data']));
    $this->app->when(
      EarnCategoryResourceController::class
    )->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['earn', 'categories']));
    $this->app->when(
      [
        HomeResourceController::class, MetaDataController::class,
        NavigationDataController::class,
      ]
    )->needs(ApiCacheContract::class)
      ->give(fn() => new ApiCacheService(['site', 'data']));

  }

  /**
   * Bootstrap services.
   */
  public function boot(): void
  {

  }
}
