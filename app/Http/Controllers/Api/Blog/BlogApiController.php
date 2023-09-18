<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Contracts\ApiCacheContract;
use App\Contracts\CountActionContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Interfaces\Blog\Contracts\PostQueryContract;
use App\Models\Category;
use App\Models\Post;
use App\Responses\CollectionResponse;
use App\Services\Blog\ApiResource\CategoryApiResource;
use App\Services\Blog\ApiResource\PostApiResource;
use Illuminate\Http\Request;

final class BlogApiController extends Controller
{
  public function __construct(
    protected CategoryQueryContract $categoryQueryContract,
    protected ApiCacheContract $cacheContract,
    protected CountActionContract $countActionContract,
    protected PostQueryContract $postQueryContract,
  ) {
  }

  /**
   * Get All Categories With Posts
   */
  public function index(Request $request): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->cacheContract->load_data(
        key: $request->getQueryString() ?? $request->path(),
        callback: fn() => CategoryApiResource::collection(
          items: $this->categoryQueryContract->handle(
            query: Category::query()
          )->get()
        )->toArray()
      )
    );
  }

  /**
   * Get Latest Posts
   * @param Request $request
   * @return CollectionResponse
   */
  public function latest(Request $request): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->cacheContract->load_data(
        key: $request->getQueryString() ? $request->getQueryString(
          ) . 'latest_posts' : 'latest_posts-4',
        callback: fn() => PostApiResource::collection(
          items: Post::query()->with('category')->latest(
            'updated_at'
          )->take($request->query('limit', 4))->get()
        )->toArray(),
        ttl: now()->addDay()
      )
    );
  }

  /**
   * Get Single Category With Posts
   * @param Request $request
   * @param Category $category
   * @return CollectionResponse
   */
  public function category(
    Request $request,
    Category $category
  ): CollectionResponse {
    return new CollectionResponse(
      data: $this->cacheContract->load_data(
        key: $request->getQueryString() ?? $request->path(),
        callback: fn() => CategoryApiResource::from(
          category: $this->categoryQueryContract->handle(
            query: Category::class
          )->find($category->id)
        )->toArray()
      )
    );
  }

  /**
   * Get Single Post
   * @noinspection PhpUnusedParameterInspection
   */
  public function post(
    Request $request,
    Category $category,
    Post $post
  ): CollectionResponse {
    if ($this->countActionContract->should_count(
      "post-$post->id"
    )) {
      views($post)->record();
      $this->countActionContract->count_views(
        post: $post,
        ip: $request->ip()
      );
    }
    return new CollectionResponse(
      data: $this->cacheContract->load_data(
        key: null === $request->getQueryString() ?
          $post->slug : $post->slug . '-' . $request->getQueryString(),
        callback: fn() => PostApiResource::from(
          payloads: $this->postQueryContract->handle()->find($post->id)
        )
      )
    );
  }
}
