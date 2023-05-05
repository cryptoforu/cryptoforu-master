<?php

declare(strict_types=1);

namespace App\Interfaces\Blog;

use App\Models\Post;

interface BlogInterface
{
    /**
     * Backend Index Page Data
     *
     * @return array
     */
    public function forIndex();

    /**
     * Backend Create Page Data
     *
     * @return array
     */
    public function forCreate();

    /**
     * Backend Edit Post
     */
    public function forEdit(Post $post): array;

    /**
     * Get Blog Categories
     */
    public function forCategories(): array;
}
