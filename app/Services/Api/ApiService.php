<?php

declare(strict_types=1);

namespace App\Services\Api;

use App\Contracts\ApiServiceContract;
use App\Interfaces\Settings\GetMenuContract;
use App\Models\Post;
use App\Services\Api\Resources\ApiHomeResource;
use App\Services\Api\Resources\BreadCrumbsResource;
use App\Services\Api\Resources\CountActions;
use App\Services\Api\Resources\MenuResource;
use App\Services\Api\Resources\MetaDataResource;
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

  /**
   * Get Menu Items
   * @param  GetMenuContract  $menuContract
   * @return MenuResource
   */
  public function menu(GetMenuContract $menuContract): MenuResource
  {
    return new MenuResource(
      menu: $menuContract,
      cache: new ApiCacheService(['api', 'front_menu'])
    );
  }

  /**
   * Get MetaData
   * @return MetaDataResource
   */
  public function meta(): MetaDataResource
  {
    return new MetaDataResource(
      cache: new ApiCacheService(['api', 'meta'])
    );
  }
}
