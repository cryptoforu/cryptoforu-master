<?php

namespace App\Services\Crypto\Queries;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

final class FilterUniqueCoins implements Filter
{

    /**
     * @inheritDoc
     */
    public function __invoke(Builder $query, $value, string $property)
    {
        return $query->whereIn('name',
          $value)->where('category', 'all_coins');
    }
}