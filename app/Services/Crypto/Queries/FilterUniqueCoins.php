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
        return $query->whereIn(
            'name',
            $value
        )->where('category', 'all_coins')->select([
            'id', 'name', 'image', 'current_price',
            'price_change_percentage_1h_in_currency',
            'price_change_percentage_24h_in_currency',
            'price_change_percentage_7d_in_currency', 'market_cap',
        ]);
    }
}
