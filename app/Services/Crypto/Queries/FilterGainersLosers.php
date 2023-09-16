<?php

declare(strict_types=1);

namespace App\Services\Crypto\Queries;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Sorts\Sort;

final class FilterGainersLosers implements Sort
{
    public function __invoke(Builder $query, bool $descending, string $property): Builder
    {
        $direction = $descending ? 'desc' : 'asc';

        return $query
            ->orderBy('price_change_percentage_24h', $direction)
            ->take(3);
    }
}
