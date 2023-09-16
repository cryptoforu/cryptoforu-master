<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

final class AppServiceProvider extends ServiceProvider
{
  /**
   * Register any application services.
   */
  public function register(): void
  {
    $this->app->register(
      provider: SettingsProvider::class
    );
    $this->app->register(
      provider: LibraryProvider::class
    );
    $this->app->register(
      provider: BlogProvider::class
    );
    $this->app->register(
      provider: EarnServiceProvider::class,
    );
    $this->app->register(
      provider: CacheStoreProvider::class,
    );

    $this->app->register(
      provider: SiteProvider::class,
    );

    $this->app->register(
      provider: CryptoProvider::class,
    );
    $this->app->register(
      provider: CryptoNewsProvider::class,
    );
    $this->app->register(
      provider: RssReaderProvider::class,
    );
    $this->app->register(
      provider: CollectionPaginationProvider::class,
    );
    $this->app->register(
      provider: CursorPaginationProvider::class
    );
    $this->app->register(
      provider: ApiCacheProvider::class
    );
    $this->app->register(
      provider: ApiServiceProvider::class
    );
    $this->app->register(
      provider: FaucetPayProvider::class
    );
    $this->app->register(
      provider: ViewsCounterProvider::class
    );
  }

  /**
   * Bootstrap any application services.
   * @noinspection PhpUndefinedMethodInspection
   */
  public function boot(): void
  {
    Str::macro('readDuration', function (...$text) {
      $totalWords = str_word_count(implode(' ', $text));
      $minutesToRead = round($totalWords / 200);

      return (int) max(1, $minutesToRead);
    });
    Model::preventLazyLoading(!$this->app->isProduction());
    Builder::macro('fastJson', function (
      $perPage = null,
      $columns = ['*'],
      $pageName = 'page',
      $page = null
    ) {
      /** @var Builder $this */
      return $this->fastPaginate(
        perPage: request()->input('page.size', $perPage),
        columns: $columns,
        pageName: $pageName,
        page: request()->input('page.number', $page)
      );
    });
    Relation::macro('fastJson', function (
      $perPage = null,
      $columns = ['*'],
      $pageName = 'page',
      $page = null
    ) {
      /** @var Relation $this */
      return $this->fastPaginate(
        perPage: request()->input('page.size', $perPage),
        columns: $columns,
        pageName: $pageName,
        page: request()->input('page.number', $page)
      );
    });
  }
}
