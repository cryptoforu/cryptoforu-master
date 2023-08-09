<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\AllPostsContract;
use App\Models\Category;
use App\Models\Post;
use App\Services\Blog\ApiResource\PostApiResource;
use App\Services\Blog\Queries\FilterCategoryPosts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Spatie\LaravelData\CursorPaginatedDataCollection;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\PaginatedDataCollection;
use Spatie\QueryBuilder\QueryBuilder;

final class PostsApiController extends Controller
{
  /**
   * Posts Api Controller Instance
   * @param  AllPostsContract  $query
   */
  public function __construct(
    private readonly AllPostsContract $query,
  ) {
  }

  /**
   * Retrive All Posts
   * @param  Request  $request
   * @return CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection
   */
  public function index(
    Request $request
  ): CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection {
    $posts = $this->query->handle(
      query: Post::query()->latest('updated_at')
    )->jsonPaginate()->appends($request->query());

    return PostApiResource::collection(
      $posts
    );
  }

  /**
   * Get Posts  From Specific Category
   * @param  Request  $request
   * @param  Category  $category
   * @return CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection
   */
  public function from_category(
    Request $request,
    Category $category
  ): CursorPaginatedDataCollection|DataCollection|PaginatedDataCollection {
    $categoryQuery = new FilterCategoryPosts($category);
    $posts = $categoryQuery->jsonPaginate()->appends($request->query());
    $postData = Cache::rememberForever(
      key: $request->path(),
      callback: static fn() => $posts
    );

    return PostApiResource::collection(
      $postData
    );
  }

  /**
   * Display the specified Post
   * @param  Post  $post
   * @return PostApiResource
   */
  public function show(Post $post): PostApiResource
  {

    $postData = QueryBuilder::for(
      $post
    )
      ->allowedFields(['category.id', 'categories.slug'])
      ->allowedIncludes(['category', 'tags'])
      ->findOrFail($post->id);

    return PostApiResource::from($postData);
  }
}
