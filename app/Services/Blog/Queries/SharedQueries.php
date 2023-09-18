<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Contracts\ApiCacheContract;
use App\Interfaces\Blog\Contracts\SharedQueriesContract;
use App\Models\Post;
use App\Services\Blog\ApiResource\PostApiResource;

final class SharedQueries implements SharedQueriesContract
{
  private int $defaultLimit = 4;

  public function __construct(
    protected ApiCacheContract $apiCacheContract,

  ) {
  }

  /**
   * @inheritDoc
   */
  public function related(
    ?string $slug = null,
    ?int $id = null
  ): array {
    return $this->apiCacheContract->load_data(
      key: 'post:related',
      callback: fn() => PostApiResource::collection(
        items: Post::related(
          slug: $slug,
          id: $id
        )->latest('updated_at')->get()
      )->toArray()
    );
  }

  /**
   * @inheritDoc
   */
  public function latest(int $limit): array
  {
    return $this->apiCacheContract->load_data(
      key: 'blog:latest',
      callback: fn() => PostApiResource::collection(
        items: Post::with('category')->select(
          [
            'id',
            'title',
            'slug',
            'image_name',
            'introduction',
            'category_id',
            'post_links',
            'updated_at',
            'created_at'
          ]
        )
          ->limit($limit)
          ->latest('updated_at')
          ->get()
      )->toArray(),
      ttl: now()->addDay()
    );
  }
}
