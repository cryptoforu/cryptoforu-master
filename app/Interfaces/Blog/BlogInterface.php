<?php

declare(strict_types=1);

namespace App\Interfaces\Blog;

use App\Models\Post;

interface BlogInterface
{
    /**
     * Backend Index Page Data
     */
    public function forIndex(): array;

    /**
     * Backend Create Page Data
     */
    public function forCreate(): array;

    /**
     * Backend Edit Post
     */
    public function forEdit(Post $post): array;

    /**
     * Get Blog Categories
     */
    public function forCategories(): array;
}
