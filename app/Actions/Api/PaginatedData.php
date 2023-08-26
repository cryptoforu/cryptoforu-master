<?php

namespace App\Actions\Api;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;

final class PaginatedData
{
    /**
     * Paginate or Return Data
     * @param  Builder  $builder
     * @return \Illuminate\Http\Request|Request|mixed
     */
    public function __invoke(Builder $builder): mixed
    {
        return Request::whenHas('page',
          function () use ($builder) {
              return $builder
                ->jsonPaginate()
                ->appends(Request::query());
          }, fn() => $builder->get()
        );
    }
}