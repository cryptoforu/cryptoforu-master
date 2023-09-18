<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Services\Blog\QueryFilters\CategoryRelatedFilter;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class CategoryQuery implements CategoryQueryContract
{
  /**
   * Query Builder For Category Api Resource
   */
  public function handle(Builder|Model|string $query): Builder
  {
    return QueryBuilder::for(
      subject: $query
    )
      ->allowedFilters([
        AllowedFilter::exact('id'),
        AllowedFilter::exact('name'),
        AllowedFilter::exact('slug'),
        AllowedFilter::custom('related', new CategoryRelatedFilter()),
      ])
      ->defaultSort('updated_at')
      ->allowedSorts('updated_at', 'created_at')
      ->allowedFields([
        'id',
        'name',
        'slug',
        'category_image',
        'description',
        'category_id',
        'posts.id',
        'posts.slug',
      ])
      ->allowedIncludes(includes: [
        'posts.tags',
      ])
      ->getEloquentBuilder();
  }
}
