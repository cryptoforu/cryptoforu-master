<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Models\Category;
use App\Services\Blog\QueryFilters\CategoryRelatedFilter;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class CategoryQuery implements CategoryQueryContract
{
  /**
   * Query Builder For Category Api Resource
   */
  public function handle(Category $category): Collection|Model|QueryBuilder
  {
    return QueryBuilder::for(
      subject: Category::query()->where('id', $category->id)
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
        'posts.id',
        'posts.title',
        'posts.image_name',
        'posts.introduction',
        'posts.post_links',
        'posts.slug',
        'posts.category_id'
      ])
      ->allowedIncludes(includes: [
        'posts',
      ])
      ->first();
  }
}
