<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\ServiceProvider;

class CollectionPaginationProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        /**
         * Paginate a standard Laravel Collection.
         *
         * @param  int  $perPage
         * @param  int  $total
         * @param  int  $page
         * @param  string  $pageName
         * @return LengthAwarePaginator
         */
        Collection::macro('colPaginate', function (
            $perPage,
            $total = null,
            $page = null,
            $pageName = 'page'
        ): LengthAwarePaginator {
            /** @var Collection $this */
            $page = $page ?: LengthAwarePaginator::resolveCurrentPage($pageName);

            return new LengthAwarePaginator(
                $total ? $this : $this->forPage($page, $perPage)->values(),
                $total ?: $this->count(),
                $perPage,
                $page,
                [
                    'path' => LengthAwarePaginator::resolveCurrentPath(),
                    'pageName' => $pageName,
                ]
            );
        });
    }
}
