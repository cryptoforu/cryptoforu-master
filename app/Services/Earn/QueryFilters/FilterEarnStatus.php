<?php

declare(strict_types=1);

namespace App\Services\Earn\QueryFilters;

use App\Services\Earn\Enums\EarnStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Spatie\QueryBuilder\Filters\Filter;

final class FilterEarnStatus implements Filter
{
    /**
     * {@inheritDoc}
     */
    public function __invoke(Builder $query, $value, string $property): void
    {
        $query->whereIn('id', [1, 2, 7, 8])->with(
            [
                'earn' => function (Relation $builder) use ($value): void {
                    $builder->where('status', EarnStatus::tryFrom($value))->select(
                        [
                            'id', 'title', 'link', 'image_name', 'main_features', 'status',
                            'earn_category_id',
                        ]
                    )->get();
                },
            ]
        );
    }
}
