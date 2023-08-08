<?php

declare(strict_types=1);

namespace App\Services\Blog\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class FilterLatestPosts implements Filter
{
    public function __invoke(Builder $query, $value, string $property): Builder
    {
        return $query->take($value);
    }
}
