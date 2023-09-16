<?php

declare(strict_types=1);

namespace App\Services\Crypto\Queries;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

final class FilterUniqueCoins implements Filter
{
    /**
     * {@inheritDoc}
     */
    public function __invoke(Builder $query, $value, string $property)
    {
        return $query->where('category', 'top-coins')->whereIn(
            'name',
            $value
        );
    }
}
