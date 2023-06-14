<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Blog;

use App\Http\Controllers\Controller;
use App\Interfaces\Blog\Contracts\CategoryQueryContract;
use App\Responses\CollectionResponse;
use App\Services\Blog\ApiResource\CategoryResource;

class CategoryResourceController extends Controller
{
    public function __construct(
        private readonly CategoryQueryContract $query,
    ) {
    }

    public function index(): CollectionResponse
    {

        return new CollectionResponse(
            data: CategoryResource::collection(
                resource: $this->query->handle()
            )
        );
    }
}
