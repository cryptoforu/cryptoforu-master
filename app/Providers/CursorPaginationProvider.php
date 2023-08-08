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
         * @param  string  $cursorName
         * @param  int  $page
         */
        Collection::macro(
            'cursorCol',
            function (
                int $perPage = 5,
                string $cursorName = 'cursor',
                ?int $page = null,
                array $options = []
            ): CursorPaginator {
                /** @var Collection $this */
                $page = $page ?: CursorPaginator::resolveCurrentCursor($cursorName);
                $results = $this->slice(($page - 1) * $perPage)->take($perPage + 1);

                $options += [
                    'path' => CursorPaginator::resolveCurrentCursor(),
                    'pageName' => $cursorName,
                ];

                return new CursorPaginator(
                    items: $results,
                    perPage: $perPage,
                    cursor: $page,
                    options: $options
                );
            }
        );
    }
}
