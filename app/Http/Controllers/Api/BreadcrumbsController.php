<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Contracts\ApiServiceContract;
use App\Http\Controllers\Controller;

class BreadcrumbsController extends Controller
{
    public function __construct(
        private readonly ApiServiceContract $apiService,
    ) {
    }

    public function __invoke(): array
    {
        return $this->apiService->breadcrumbs()->generate();
    }
}
