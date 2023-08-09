<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\CacheContract;
use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

final class MetaDataController extends Controller
{
  /**
   * Site Meta Data Instance
   * @param  CacheContract  $cache
   */
  public function __construct(
    protected CacheContract $cache,
  ) {
  }

  /**
   * Seo Meta Data Api
   * @param  Request  $request
   * @return mixed
   */
  public function __invoke(Request $request)
  {
    $cache_key = $request->query('filter');

    return $this->cache->load(
      key: $cache_key['page_name'] ?? $cache_key['route'] ?? $cache_key['page_type'],
      callback: fn() => QueryBuilder::for(Page::class)
        ->allowedFilters([
          'page_name', 'route', 'page_type',
        ])->select(['label', 'meta_desc', 'route'])->first()
    );

  }
}
