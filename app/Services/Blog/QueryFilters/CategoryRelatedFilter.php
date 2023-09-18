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
      $query->whereHas('posts', function (Builder $builder) {
        $builder->inRandomOrder();
      });
    }

    $query->whereHas('posts', function (Builder $builder) use ($value) {
      $builder->with('category')->whereNot('slug', $value);
    });
  }
}
