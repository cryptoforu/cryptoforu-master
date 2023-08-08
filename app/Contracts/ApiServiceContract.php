<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Post;
use App\Services\Api\Resources\ApiHomeResource;
use App\Services\Api\Resources\BreadCrumbsResource;
use App\Services\Api\Resources\CountActions;

interface ApiServiceContract
{
    public function home(): ApiHomeResource;

    public function breadcrumbs(): BreadCrumbsResource;

    public function post_count(Post $post, string $ip): CountActions;
}
