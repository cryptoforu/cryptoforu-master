<?php

declare(strict_types=1);

namespace App\Services\Blog;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Interfaces\Blog\BlogActionInterface;
use App\Models\Post;
use App\Services\Blog\Actions\StorePost;
use App\Services\Blog\Actions\UpdatePost;

class BlogActions implements BlogActionInterface
{
    /**
     * Blog Actions Instance
     */
    public function __construct(
        private readonly StorePost $store,
        private readonly UpdatePost $update,
    ) {
    }

    /**
     * Store Post
     */
    public function store(StorePostRequest $request): void
    {
        $this->store->handle(
            request: $request
        );
    }

    /**
     * Update Post
     */
    public function update(
        UpdatePostRequest $request,
        Post $post,
    ): bool {
        return $this->update->handle(
            request: $request,
            post: $post,
        );
    }
}
