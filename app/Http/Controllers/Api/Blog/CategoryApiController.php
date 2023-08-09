<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Models\Category;
use App\Services\Blog\ApiResource\CategoryApiResource;
use Spatie\LaravelData\CursorPaginatedDataCollection;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class CategoryApiController extends Controller
{
  /**
   * Blog Category Instance
   * @param  CategoryQueryContract  $query
   */
  public function __construct(
    private readonly CategoryQueryContract $query,
  ) {
  }

  /**
   * Get All Categories with posts and post tags
   * @return CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection
   */
  public function index(
  ): CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection
  {
    $categoryData = $this->query->handle(
      query: Category::query()->latest()
    );

    return CategoryApiResource::collection(
      $categoryData->get()
    );
  }

  /**
   * Get Specific Category
   * @param  Category  $category
   * @return CategoryApiResource
   */
  public function show(
    Category $category
  ): CategoryApiResource {
    $categoryData = QueryBuilder::for(
      $category
    )->allowedFilters([AllowedFilter::exact('posts.slug')])
      ->allowedIncludes(['posts.tags'])
      ->findOrFail($category->id);

    return CategoryApiResource::from(
      $categoryData
    );
  }
}
