<?php

declare(strict_types=1);

namespace App\Services\Earn\QueryFilters;

use App\Services\Earn\ApiResource\EarnApiResource;
use Illuminate\Contracts\Database\Eloquent\Builder as B;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\Includes\IncludeInterface;

final class IncludeDataFilter implements IncludeInterface
{
    /**
     * {@inheritDoc}
     */
    public function __invoke(Builder $query, string $include)
    {
        return $query->with([
            'earn' => function (B $builder) {
                return $builder->get()->map(static fn (
                    $item
                ) => EarnApiResource::fromModel($item));
            },
        ])->select(['id', 'name', 'description', 'category_image', 'updated_at']);
    }
}
