<?php

declare(strict_types=1);

namespace App\Services\Crypto\Queries;

use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class CoinQuery implements CoinQueryContract
{
    public function handle(Builder|Model $query): Builder
    {
        return QueryBuilder::for(
            subject: $query
        )
            ->allowedFilters([
                AllowedFilter::exact('category'),
                AllowedFilter::exact('name'),
                AllowedFilter::exact('symbol'),
                AllowedFilter::custom('unique', new FilterUniqueCoins()),
            ])
            ->defaultSort('market_cap_rank')
            ->allowedSorts('market_cap_rank', 'name')
            ->select([
                'id', 'name', 'image', 'current_price',
                'price_change_percentage_1h_in_currency',
                'price_change_percentage_24h_in_currency',
                'price_change_percentage_7d_in_currency', 'market_cap',
            ])
            ->getEloquentBuilder()
        ;
    }
}
