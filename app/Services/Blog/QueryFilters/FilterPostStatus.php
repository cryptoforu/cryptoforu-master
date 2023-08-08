<?php

declare(strict_types=1);

namespace App\Services\Blog\QueryFilters;

use App\Services\Blog\Enums\PostStatus;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

final class FilterPostStatus implements Filter
{
    /**
     * {@inheritDoc}
     */
    public function __invoke(Builder $query, $value, string $property)
    {
        if ('featured' === $value) {
            return $query->where('status', PostStatus::FEATURED());
        }

        if ('published' === $value) {
            return $query->where('status', PostStatus::PUBLISHED());
        }

        return $query;
    }
}
