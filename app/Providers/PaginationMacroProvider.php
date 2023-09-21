<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

final class PaginationMacroProvider extends ServiceProvider
{
  /**
   * Register services.
   */
  public function register(): void
  {
    //
  }

  /**
   * Bootstrap services.
   * @noinspection PhpUndefinedMethodInspection
   */
  public function boot(): void
  {
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
