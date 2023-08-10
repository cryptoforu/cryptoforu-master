<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Interfaces\Settings\GetMenuContract;
use App\Models\Post;
use App\Services\Api\Resources\ApiHomeResource;
use App\Services\Api\Resources\BreadCrumbsResource;
use App\Services\Api\Resources\CountActions;
use App\Services\Api\Resources\MenuResource;
use App\Services\Api\Resources\MetaDataResource;

interface ApiServiceContract
{
  public function home(): ApiHomeResource;

  public function breadcrumbs(): BreadCrumbsResource;

  public function post_count(Post $post, string $ip): CountActions;

  public function menu(GetMenuContract $menuContract): MenuResource;

  public function meta(): MetaDataResource;
}
