<?php

declare(strict_types=1);

namespace App\Services\Earn\Queries;

use App\Interfaces\Earn\EarnCategoryQueryContract;
use App\Services\Earn\QueryFilters\EarnDataFilter;
use App\Services\Earn\QueryFilters\FilterEarnStatus;
use App\Services\Earn\QueryFilters\IncludeDataFilter;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\AllowedInclude;
use Spatie\QueryBuilder\QueryBuilder;

final class EarnCategoryQuery implements EarnCategoryQueryContract
{
    public function handle(Builder $query): Builder
    {
        return QueryBuilder::for(
            $query
        )->allowedFilters([
            AllowedFilter::exact('id'),
            AllowedFilter::custom('featured', new FilterEarnStatus()),
            AllowedFilter::custom('data', new EarnDataFilter()),
        ])
            ->allowedFields([
                'earn.id', 'earn.title', 'earn.link',
                'earn.image_name',
                'earn.earn_category_id', 'earn.main_features', 'earn.status',
            ])
            ->allowedIncludes([
                'earn', AllowedInclude::custom('data', new IncludeDataFilter()),
            ])
            ->getEloquentBuilder();

    }
}
