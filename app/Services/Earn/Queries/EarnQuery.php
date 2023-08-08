<?php

declare(strict_types=1);

namespace App\Services\Earn\Queries;

use App\Interfaces\Earn\EarnQueryContract;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class EarnQuery implements EarnQueryContract
{
    public function handle(Builder $query): Builder
    {
        return QueryBuilder::for(
            subject: $query
        )->allowedFilters([
            AllowedFilter::exact('id'),
            AllowedFilter::exact('status'),
        ])->allowedIncludes(['earnCategory'])
            ->getEloquentBuilder()
        ;
    }
}
