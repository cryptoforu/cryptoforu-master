<?php

declare(strict_types=1);

namespace App\Services\FrontEnd\Queries;

use App\Enums\ColorScheme;
use App\Models\Post;
use App\Services\Blog\DataObjects\PostData;
use App\Services\Blog\Enums\PostStatus;
use Illuminate\Support\Collection;

final class LatestPostsQuery
{
    /**
     * Latest Blog Posts
     */
    public function handle(): Collection
    {
        return new Collection(
            items: Post::ofStatus(
                PostStatus::PUBLISHED()
            )->with('category')->take(3)
                ->latest()
                ->get()
                ->map(
                    fn ($post) => PostData::fromData($post)
                        ->additional([
                            'color' => ColorScheme::randColor(),
                        ])
                )
                ->toArray()
        );
    }
}
