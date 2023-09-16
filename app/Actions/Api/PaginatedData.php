<?php

declare(strict_types=1);

namespace App\Actions\Api;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Request;

final class PaginatedData
{
    /**
     * Paginate or Return Data
     *
     * @return \Illuminate\Http\Request|Request|mixed
     */
    public function __invoke(Builder|Collection $builder): mixed
    {
        return Request::whenHas(
            'page_size',
            function () use ($builder) {
                return $builder
                    ->cursorPaginate(
                        perPage: Request::query(key: 'page_size', default: 15)
                    )
                    ->appends(Request::query());
            },
            fn () => $builder->get()
        );
    }
}
