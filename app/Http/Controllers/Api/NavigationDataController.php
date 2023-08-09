<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NavigationDataController extends Controller
{
  /**
   * Navigation Data Instance
   * @param  ApiServiceContract  $apiService
   */
  public function __construct(
    private readonly ApiServiceContract $apiService,
  ) {
  }

  /**
   * Handle the incoming request.
   * @param  Request  $request
   * @return array
   */
  public function __invoke(
    Request $request
  ): array {

    return $this->apiService
      ->breadcrumbs()
      ->generate();

  }
}
