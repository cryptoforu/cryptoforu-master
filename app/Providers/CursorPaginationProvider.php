<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\ServiceProvider;

class CursorPaginationProvider extends ServiceProvider
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
         * Cursor Paginate a standard Laravel Collection.
         *
         * @param  int  $perPage
         * @param  int  $total
         * @param  int  $page
         * @param  string  $pageName
         * @return array
         */
        Collection::macro(
            'cursorCol',
            function (
                $perPage,
                $total = null,
                $page = null,
                $pageName = 'page'
            ): CursorPaginator {
                /** @var Collection $this */
                $page = $page ?: CursorPaginator::resolveCurrentCursor($pageName);

                return new CursorPaginator(
                    items: $total ? $this : $this->forPage($page, $perPage)->values(),
                    perPage: $perPage,
                    cursor: $page,
                    options: [
                        'path' => CursorPaginator::resolveCurrentCursor(),
                        'pageName' => $pageName,
                    ]
                );
            }
        );
    }
}
