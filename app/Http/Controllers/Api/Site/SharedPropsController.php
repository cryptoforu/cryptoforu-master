<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Site;

use App\Contracts\ApiServiceContract;
use App\Contracts\CountActionContract;
use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Responses\CollectionResponse;
use App\Responses\JsonResponse;
use Illuminate\Http\Request;

final class SharedPropsController extends Controller
{
    public function __construct(
        protected ApiServiceContract  $service,
        protected CountActionContract $actionContract
    ) {
    }

    /**
     * Get Page Meta Data
     */
    public function meta_data(): CollectionResponse
    {
        return new CollectionResponse(
            data: $this->service->meta()->get_meta_data()
        );
    }

    /**
     * Get Pages Breadcrumbs
     */
    public function breadcrumbs(): CollectionResponse
    {
        return new CollectionResponse(
            data: $this->service->breadcrumbs()->generate()
        );
    }

    /**
     * Posts View Count
     */
    public function count_views(Request $request, Post $post): JsonResponse
    {
        return new JsonResponse(
            data: $this->actionContract->count_views(
                post: $post,
                ip: $request->ip()
            )
        );
    }
}
