<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Site;

use App\Contracts\CacheContract;
use App\Http\Controllers\Controller;
use App\Models\Site;
use App\Responses\CollectionResponse;
use App\Responses\ErrorResponse;
use App\Services\Site\ApiResource\SiteResource;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

final class HomeResourceController extends Controller
{
  /**
   * Home Api Resource Instance
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
    $data = QueryBuilder::for($site)
      ->allowedFilters([AllowedFilter::exact('data_name')])
      ->allowedFields(['data_values'])
      ->find($site->id);
    return new CollectionResponse(
      data: SiteResource::make($data)
    );
  }
}
