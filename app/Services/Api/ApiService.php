<?php

declare(strict_types=1);

namespace App\Services\Api;

use App\Contracts\ApiServiceContract;
use App\Models\Post;
use App\Services\Api\Resources\ApiHomeResource;
use App\Services\Api\Resources\BreadCrumbsResource;
use App\Services\Api\Resources\CountActions;
use App\Services\Store\ApiCacheService;
use Spatie\Valuestore\Valuestore;

class ApiService extends Valuestore implements ApiServiceContract
{
  /**
   * Home Api Resource
   * @return ApiHomeResource
   */
  public function home(): ApiHomeResource
  {
    return new ApiHomeResource(
      apiService: $this,
      cache: new ApiCacheService(['api', 'home'])
    );
  }

  /**
   * Get Breadcrumbs
   * @return BreadCrumbsResource
   */
  public function breadcrumbs(): BreadCrumbsResource
  {
    return new BreadCrumbsResource(
      cache: new ApiCacheService(['api', 'breadcrumbs'])
    );
  }

  /**
   * Count Posts
   * @param  Post  $post
   * @param  string  $ip
   * @return CountActions
   */
  public function post_count(Post $post, string $ip): CountActions
  {
    return new CountActions(
      apiService: $this,
      cache: new ApiCacheService(['api', 'count_views']),
      post: $post,
      ip: $ip
    );
  }
}
