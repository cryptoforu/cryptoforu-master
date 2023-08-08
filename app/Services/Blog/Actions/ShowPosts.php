<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Models\Post;
use App\Services\Blog\DataObjects\PostData;

final class ShowPosts
{
    /**
     * Get Post Table Data
     */
    public function handle(): array
    {
        $data = Post::with([
            'category', 'tags',
        ])->latest()->paginate(request()->query(
            'page[size]',
            10
        ))->appends(request()->query());

        return PostData::collection(
            $data
        )->toArray();
    }
}
