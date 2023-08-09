<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;

final class BreadcrumbsController extends Controller
{
  /**
   * Breadcrumbs Instance
   * @param  ApiServiceContract  $apiService
   */
  public function __construct(
    protected ApiServiceContract $apiService,
  ) {
  }

  /**
   * Get Breadcrumbs
   * @return array
   */
  public function __invoke(): array
  {
    return $this->apiService->breadcrumbs()->generate();
  }
}
