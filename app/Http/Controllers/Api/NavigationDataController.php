<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NavigationDataController extends Controller
{
    public function __construct(
        private readonly ApiServiceContract $apiService,
    ) {
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(
        Request $request
    ) {

        return $this->apiService->breadcrumbs()->generate();

    }
}
