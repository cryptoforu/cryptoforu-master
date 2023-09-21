<?php

namespace App\Http\Controllers\Api\Blog;

use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\AllCategoriesQueryContract;
use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Interfaces\Blog\Contracts\SharedQueriesContract;
use App\Models\Category;
use App\Responses\CollectionResponse;
use App\Services\Blog\ApiResource\CategoryApiResource;
use Illuminate\Http\Request;

final class CategoryApiController extends Controller
{

  /**
   * Category Api Instance
   * @param ApiCacheContract $cacheContract
   * @param AllCategoriesQueryContract $allCategoriesQueryContract
   * @param CategoryQueryContract $categoryQueryContract
   */
  public function __construct(
    protected ApiCacheContract $cacheContract,
    protected AllCategoriesQueryContract $allCategoriesQueryContract,
    protected CategoryQueryContract $categoryQueryContract,
    protected SharedQueriesContract $sharedQueriesContract
  ) {
  }

  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->cacheContract->load_data(
        key: 'blog:index',
        callback: fn() => CategoryApiResource::collection(
          items: $this->allCategoriesQueryContract->handle()
        )->toArray()
      )
    );
  }

  /**
   * Display the specified resource.
   */
  public function show(Category $category): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->cacheContract->load_data(
        key: 'blog:category',
        callback: fn() => CategoryApiResource::from(
          category: $this->categoryQueryContract->handle(
            category: $category
          )
        )->toArray()
      )
    );
  }

  public function related(Category $category): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->cacheContract->load_data(
        key: 'category:related',
        callback: fn() => $this->sharedQueriesContract->related(
          id: $category->id,
        )
      )
    );
  }
}
