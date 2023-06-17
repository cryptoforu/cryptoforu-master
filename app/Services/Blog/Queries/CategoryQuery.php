<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CategoryQuery implements CategoryQueryContract
{
  /**
   * Query Builder For Category Api Resource
   * @return Collection|array
   */
  public function handle(): Collection|array
  {
    return QueryBuilder::for(
      subject: Category::class
    )
      ->allowedFilters([
        AllowedFilter::exact('id'), AllowedFilter::exact('name'),
      ])
      ->allowedIncludes(includes: ['posts'])
      ->get();
  }
}
