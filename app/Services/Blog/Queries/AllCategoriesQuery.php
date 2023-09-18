<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;


use App\Interfaces\Blog\Contracts\AllCategoriesQueryContract;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class AllCategoriesQuery implements AllCategoriesQueryContract
{
  public function handle(): Collection|array
  {
    return QueryBuilder::for(
      subject: Category::class
    )->allowedFilters([
      AllowedFilter::exact('id'),
      AllowedFilter::exact('name'),
      AllowedFilter::exact('slug'),
    ])
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
      ])->get();
  }
}
