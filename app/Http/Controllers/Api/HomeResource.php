<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;
use App\Responses\CollectionResponse;
use App\Responses\ErrorResponse;
use Illuminate\Http\Request;

class HomeResource extends Controller
{
    public function __construct(
        private readonly ApiServiceContract $apiService,
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request): CollectionResponse|ErrorResponse
    {

        return new CollectionResponse(
            data: $this->apiService->home()->generate()
        );
    }
}
