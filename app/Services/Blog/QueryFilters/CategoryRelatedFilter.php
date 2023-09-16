<?php

declare(strict_types=1);

namespace App\Services\Blog\QueryFilters;

use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

final class CategoryRelatedFilter implements Filter
{
    /**
     * {@inheritDoc}
     */
    public function __invoke(Builder $query, $value, string $property)
    {
        if ('category' === $value) {
            return $query->inRandomOrder()->take(4);
        }

        return $query->whereNot('slug', $value)->inRandomOrder()->take(4);
    }
}
