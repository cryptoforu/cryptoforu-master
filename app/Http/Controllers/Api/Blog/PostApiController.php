<?php

namespace App\Http\Controllers\Api\Blog;

use App\Contracts\ApiCacheContract;
use App\Contracts\CountActionContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\AllPostsContract;
use App\Interfaces\Blog\Contracts\PostQueryContract;
use App\Interfaces\Blog\Contracts\SharedQueriesContract;
use App\Models\Post;
use App\Responses\CollectionResponse;
use App\Services\Blog\ApiResource\PostApiResource;
use Illuminate\Http\Request;

final class PostApiController extends Controller
{
  /**
   * Posts Instance
   * @param ApiCacheContract $apiCacheContract
   * @param AllPostsContract $allPostsContract
   * @param PostQueryContract $postQueryContract
   * @param CountActionContract $countActionContract
   */
  public function __construct(
    protected ApiCacheContract $apiCacheContract,
    protected AllPostsContract $allPostsContract,
    protected PostQueryContract $postQueryContract,
    protected CountActionContract $countActionContract,
    protected SharedQueriesContract $sharedQueriesContract,
  ) {
  }

  /**
   * Display a listing of the resource.
   */
  public function index(Request $request): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->apiCacheContract->load_data(
        key: 'blog:posts',
        callback: fn() => PostApiResource::collection(
          items: $this->allPostsContract->handle()
        )->toArray()
      )
    );
  }

  /**
   * Display the specified resource.
   */
  public function show(Request $request, Post $post): CollectionResponse
  {
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
      data: $this->apiCacheContract->load_data(
        key: 'blog:posts',
        callback: fn() => PostApiResource::from(
          $this->postQueryContract->handle(
            post: $post
          )
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
      data: $this->apiCacheContract->load_data(
        key: 'blog:latest',
        callback: fn() => $this->sharedQueriesContract->latest(
          $request->query('limit', 4)
        ),
        ttl: now()->addDay()
      )
    );
  }

  public function related(Post $post): CollectionResponse
  {
    return new CollectionResponse(
      data: $this->sharedQueriesContract->related(
        slug: $post->slug,
        id: $post->category_id
      )
    );
  }
}
