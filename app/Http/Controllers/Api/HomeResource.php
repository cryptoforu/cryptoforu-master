<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;
use App\Responses\CollectionResponse;
use App\Responses\ErrorResponse;
use Illuminate\Http\Request;

final class HomeResource extends Controller
{
  /**
   * Home Api Resource
   * @param  ApiServiceContract  $apiService
   */
  public function __construct(
    private readonly ApiServiceContract $apiService,
  ) {
  }

  /**
   * Get HomePage Data
   * @param  Request  $request
   * @return CollectionResponse|ErrorResponse
   */
  public function __invoke(Request $request): CollectionResponse|ErrorResponse
  {

    return new CollectionResponse(
      data: $this->apiService->home()->generate()
    );
  }
}
