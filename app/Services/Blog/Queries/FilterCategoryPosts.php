<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Models\Category;
use App\Models\Post;
use App\Services\Blog\QueryFilters\FilterPostStatus;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class FilterCategoryPosts extends QueryBuilder
{
  /**
   * @param  Category  $category
   */
  public function __construct(Category $category)
  {
    $postsQuery = Post::query()
      ->where('category_id', $category->id)
      ->with(['category', 'tags']);
    parent::__construct($postsQuery);

    $this->allowedFilters([
      AllowedFilter::exact('id'),
      AllowedFilter::custom('postStatus', new FilterPostStatus()),
    ]);
  }
}
