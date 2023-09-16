<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiActions;

use App\Contracts\ApiCacheContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;

final class PaginateCollection
{
    public function __construct(
        protected ApiCacheContract $cacheContract
    ) {
    }

    /**
     * @return \Illuminate\Http\Request|Request|mixed
     */
    public function __invoke(
        Builder $builder
    ): mixed {
        return Request::whenHas(
            'page',
            function () use ($builder) {
                return $this->cacheContract->load_data(
                    key: Request::getQueryString(),
                    callback: fn () => $builder->jsonPaginate()->appends(Request::query()),
                    ttl: now()->addDay()
                );
            },
            function () use ($builder) {
                return $this->cacheContract->load_data(
                    key: null === Request::getQueryString() ? Request::path() : Request::getQueryString(),
                    callback: fn () => $builder->get()
                );
            }
        );
    }
}
