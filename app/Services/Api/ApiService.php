<?php

declare(strict_types=1);

namespace App\Services\Api;

use App\Contracts\ApiServiceContract;
use App\Services\Api\Resources\BreadCrumbsResource;
use App\Services\Api\Resources\MenuResource;
use App\Services\Api\Resources\MetaDataResource;
use App\Services\Store\ApiCacheService;
use Spatie\Valuestore\Valuestore;

final class ApiService extends Valuestore implements ApiServiceContract
{
  /**
   * Get Breadcrumbs
   */
  public function breadcrumbs(): BreadCrumbsResource
  {
    return new BreadCrumbsResource(
      cache: new ApiCacheService(['api', 'breadcrumbs'])
    );
  }

  /**
   * Get Menu Items
   */
  public function menu(): MenuResource
  {
    return new MenuResource(
      cache: new ApiCacheService(['api', 'front_menu'])
    );
  }

  /**
   * Get MetaData
   */
  public function meta(): MetaDataResource
  {
    return new MetaDataResource(
      cache: new ApiCacheService(['api', 'meta'])
    );
  }
}
