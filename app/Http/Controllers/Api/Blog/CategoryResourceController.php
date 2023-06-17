<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Contracts\CacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Responses\CollectionResponse;
use App\Services\Blog\ApiResource\CategoryResource;
use Illuminate\Http\Request;

final class CategoryResourceController extends Controller
{
  /**
   * Category Api Resource Instance
   * @param  CategoryQueryContract  $query
   * @param  CacheContract  $cache
   */
  public function __construct(
    private readonly CategoryQueryContract $query,
    private readonly CacheContract $cache,
  ) {
  }

  /**
   * @param  Request  $request
   * @return CollectionResponse
   */
  public function index(Request $request): CollectionResponse
  {

    return new CollectionResponse(
      data: $this->cache->load(
        key: 'categories-'.$request->string('filter[id]') ?? 'categories',
        callback: fn() => CategoryResource::collection(
          resource: $this->query->handle()
        ),
        ttl: now()->addWeek()
      )
    );
  }
}
