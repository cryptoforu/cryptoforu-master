<?php

declare(strict_types=1);

namespace App\Services\Blog\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class CategoryRelatedFilter implements Filter
{
    /**
     * {@inheritDoc}
     */
    public function __invoke(Builder $query, $value, string $property)
    {
        return $query->whereNot('slug', $value)->inRandomOrder()->take(4);
    }
}
