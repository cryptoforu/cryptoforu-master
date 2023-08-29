<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Services\Api\Resources\BreadCrumbsResource;
use App\Services\Api\Resources\MenuResource;
use App\Services\Api\Resources\MetaDataResource;

interface ApiServiceContract
{
    public function breadcrumbs(): BreadCrumbsResource;

    public function menu(): MenuResource;

    public function meta(): MetaDataResource;
}
