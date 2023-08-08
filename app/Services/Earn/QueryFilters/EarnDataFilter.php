<?php

declare(strict_types=1);

namespace App\Services\Earn\QueryFilters;

use App\Services\Earn\ApiResource\EarnApiResource;
use Illuminate\Contracts\Database\Eloquent\Builder as B;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Filters\Filter;

class EarnDataFilter implements Filter
{
    /**
     * {@inheritDoc}
     */
    public function __invoke(Builder $query, $value, string $property)
    {
        return $query->with([
            'earn' => function (B $builder) {
                return $builder->get()->map(static fn (
                    $item
                ) => EarnApiResource::fromModel($item));
            },
        ])->select($value);
    }
}
