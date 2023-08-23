<?php

namespace App\Services\Blog\ApiActions;

use App\Contracts\ApiCacheContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;

class PaginateCollection
{
    public function __construct(
      protected ApiCacheContract $cacheContract
    ) {
    }

    /**
     *
     * @param  Builder  $builder
     * @return \Illuminate\Http\Request|Request|mixed
     */
    public function __invoke(
      Builder $builder
    ): mixed {
        return Request::whenHas('page',
          function () use ($builder) {
              return $this->cacheContract->load_data(
                key: Request::getQueryString(),
                callback: function () use ($builder) {
                    return $builder->jsonPaginate()->appends(Request::query());
                },
                ttl: now()->addDay()
              );
          }, function () use ($builder) {
              return $this->cacheContract->load_data(
                key: is_null(Request::getQueryString()) ? Request::path() : Request::getQueryString(),
                callback: function () use ($builder) {
                    return $builder->get();
                }
              );
          });
    }
}