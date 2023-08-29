<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Queries;

use App\Interfaces\Faucetpay\FaucetListCategoryContract;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class FaucetListCategoryQuery implements FaucetListCategoryContract
{
    public function handle(Builder|Model $query): Builder
    {
        return QueryBuilder::for(
            subject: $query
        )->allowedFilters(
            [
                AllowedFilter::exact('symbol'),
                AllowedFilter::exact('name'),
                AllowedFilter::exact('list.currency'),
            ]
        )->getEloquentBuilder();
    }
}
