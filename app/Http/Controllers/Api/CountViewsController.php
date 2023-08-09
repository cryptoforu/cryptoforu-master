<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class CountViewsController extends Controller
{
  /**
   * Count Post Views Instance
   * @param  ApiServiceContract  $apiService
   */
  public function __construct(
    protected ApiServiceContract $apiService,
  ) {
  }

  /**
   * Register Post View and Retrieve Count
   * @param  Request  $request
   * @param  Post  $post
   * @return JsonResponse
   */
  public function __invoke(
    Request $request,
    Post $post
  ): JsonResponse {
    $count = $this->apiService->post_count(
      $post,
      $request->ip()
    )->count()['views'];

    return response()->json([$count]);

  }
}
