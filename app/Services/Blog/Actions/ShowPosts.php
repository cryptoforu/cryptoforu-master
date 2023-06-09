<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Models\Post;
use App\Services\Blog\DataObjects\PostData;
use App\Services\Blog\Enums\PostStatus;

final class ShowPosts
{
    /**
     * Get Post Table Data
     */
    public function handle(): array
    {
        $data = Post::with(['category', 'tags'])->get();

        return PostData::collection(
            items: $data->map(fn ($item) => PostData::fromData($item)->additional([
                'statusValues' => PostStatus::cases(),
                'color' => PostStatus::tryFrom($item->status)->color(),
                'endpoints' => [
                    'status' => route(
                        'admin:blog:status',
                        ['post' => $item->slug],
                        false
                    ),
                    'edit' => route(
                        'admin:blog:post.edit',
                        ['post' => $item->slug],
                        false
                    ),
                    'delete' => route(
                        'admin:blog:post.destroy',
                        ['post' => $item->slug],
                        false
                    ),
                ],
            ]))
        )->toArray();
    }
}
