<?php

declare(strict_types=1);

namespace App\Services\Api;

use App\Contracts\ApiServiceContract;
use App\Models\Post;
use App\Services\Api\Resources\ApiHomeResource;
use App\Services\Api\Resources\BreadCrumbsResource;
use App\Services\Api\Resources\CountActions;
use App\Services\Store\ApiCacheService;
use Spatie\Valuestore\Valuestore;

class ApiService extends Valuestore implements ApiServiceContract
{
    public function home(): ApiHomeResource
    {
        return new ApiHomeResource(
            apiService: $this,
            cache: new ApiCacheService(['api', 'home'])
        );
    }

    public function breadcrumbs(): BreadCrumbsResource
    {
        return new BreadCrumbsResource(
            apiService: $this,
            cache: new ApiCacheService(['api', 'breadcrumbs'])
        );
    }

    public function post_count(Post $post, string $ip): CountActions
    {
        return new CountActions(
            apiService: $this,
            cache: new ApiCacheService(['api', 'count_views']),
            post: $post,
            ip: $ip
        );
    }
}
