<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Site;

use App\Contracts\CacheContract;
use App\Http\Controllers\Controller;
use App\Models\Site;
use App\Responses\CollectionResponse;
use App\Responses\ErrorResponse;
use App\Services\Site\ApiResource\HomeResource;
use Illuminate\Http\Request;

final class HomeResourceController extends Controller
{
  /**
   * Home Api Resource Instance
   * @param  CacheContract  $cache
   */
  public function __construct(
    private readonly CacheContract $cache,
  ) {
  }

  /**
   * Handle the incoming request.
   */
  public function __invoke(
    Request $request,
    Site $site
  ): CollectionResponse|ErrorResponse {
    return new CollectionResponse(
      data: $this->cache->load(
        key: $request->query('fields[sites]') ?? $site->data_name,
        callback: fn() => HomeResource::make($site),
      )
    );
  }
}
