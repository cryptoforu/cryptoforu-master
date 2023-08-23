<?php

namespace App\Http\Controllers\Api\Blog;

use App\Contracts\ApiCacheContract;
use App\Contracts\CountActionContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Models\Category;
use App\Models\Post;
use App\Responses\CollectionResponse;
use App\Services\Blog\ApiActions\PaginateCollection;
use App\Services\Blog\ApiResource\CategoryApiResource;
use App\Services\Blog\ApiResource\PostApiResource;
use App\Services\Blog\Queries\FilterCategoryPosts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Pipeline;
use Spatie\QueryBuilder\QueryBuilder;

final class BlogApiController extends Controller
{
    /**
     * @param  CategoryQueryContract  $categoryQueryContract
     * @param  ApiCacheContract  $cacheContract
     * @param  CountActionContract  $countActionContract
     */
    public function __construct(
      protected CategoryQueryContract $categoryQueryContract,
      protected ApiCacheContract $cacheContract,
      protected CountActionContract $countActionContract,
    ) {
    }

    /**
     * Get All Categories With Posts
     * @param  Request  $request
     * @return CollectionResponse
     */
    public function index(Request $request): CollectionResponse
    {
        $data = $this->cacheContract->load_data(
          key: is_null($request->getQueryString()) ? $request->path() : $request->getQueryString(),
          callback: function () {
              return $this->categoryQueryContract->handle(
                query: Category::query()->latest(
                  column: 'updated_at'
                )
              )->get();
          }
        );

        return new CollectionResponse(
          data: CategoryApiResource::collection(
            $data
          )->toArray()
        );
    }

    /**
     * @return CollectionResponse
     */
    public function latest(): CollectionResponse
    {
        $data = $this->cacheContract->load_data(
          key: 'latest_posts',
          callback: function () {
              return Post::query()->with('category')->latest('updated_at')->take(3)->get();
          },
          ttl: now()->addDay()
        );
        return new CollectionResponse(
          data: PostApiResource::collection(
            items: $data
          )->toArray()
        );
    }

    /**
     * @param  Category  $category
     * @return CollectionResponse
     */
    public function category(Category $category): CollectionResponse
    {
        $query = new FilterCategoryPosts(
          category: $category,
        );
        $categoryData = $query->getEloquentBuilder();
        $data = Pipeline::send($categoryData)
          ->through([
            new PaginateCollection(
              cacheContract: $this->cacheContract
            )
          ])->then(fn($categoryData) => $categoryData);

        return new CollectionResponse(
          data: PostApiResource::collection(
            items: $data
          )->toArray()
        );
    }

    /**
     * @param  Request  $request
     * @param  Category  $category
     * @param  Post  $post
     * @return CollectionResponse
     */
    public function post(
      Request $request,
      Category $category,
      Post $post
    ): CollectionResponse {
        if ($this->countActionContract->should_count("post-$post->id")) {
            views($post)->record();
            $this->countActionContract->count_views(
              post: $post,
              ip: $request->ip()
            );
        }

        $postData = $this->cacheContract->load_data(
          key: is_null($request->getQueryString()) ? $post->slug : $post->slug.'-'.$request->getQueryString(),
          callback: function () use ($post) {
              return QueryBuilder::for(
                Post::class
              )->allowedFields([
                'id', 'slug', 'category_id', 'status',
                'categories.id', 'categories.slug'
              ])
                ->with('category')
                ->findOrFail($post->id);
          }
        );
        return new CollectionResponse(
          data: PostApiResource::from($postData)
        );
    }
}
