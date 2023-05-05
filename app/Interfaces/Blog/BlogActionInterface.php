<?php

declare(strict_types=1);

namespace App\Interfaces\Blog;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;

interface BlogActionInterface
{
    /**
     * Store Blog Post
     */
    public function store(StorePostRequest $request): void;

    /**
     * Update Post
     */
    public function update(UpdatePostRequest $request, Post $post): bool;
}
