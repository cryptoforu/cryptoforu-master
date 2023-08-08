<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CountViewsController extends Controller
{
    public function __construct(
        private readonly ApiServiceContract $apiService,
    ) {
    }

    /**
     * Handle the incoming request.
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
