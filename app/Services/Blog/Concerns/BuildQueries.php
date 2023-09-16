<?php

declare(strict_types=1);

namespace App\Services\Blog\Concerns;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait BuildQueries
{
    public function checkPrevCategory(
        int $id
    ): Model|Builder|array|string|null {
        $query = Category::query()
            ->where('id', '<', $id)
            ->orderBy('id', 'desc')
            ->select(['name', 'slug'])->first();
        if (null !== $query) {
            return [
                'name' => $query->name,
                'slug' => 'learn-crypto/' . $query->slug,
            ];
        }

        return null;
    }

    public function checkNextCategory(int $id): Model|Builder|array|string|null
    {
        $query = Category::query()
            ->where('id', '>', $id)
            ->orderBy('id')
            ->select(['name', 'slug'])->first();
        if (null !== $query) {
            return [
                'name' => $query->name,
                'slug' => 'learn-crypto/' . $query->slug,
            ];
        }

        return null;
    }

    public function checkPrevPost(int $id): ?array
    {
        $post = Post::query()
            ->where('id', '<', $id)
            ->orderBy('id', 'desc')
            ->select(['title', 'slug', 'category_id'])
            ->with('category:id,slug')
            ->first();
        if (null !== $post) {
            return [
                'name' => $post->title,
                'slug' => 'learn-crypto/' . $post->category->slug . '/' . $post->slug,
            ];
        }

        return null;
    }

    public function checkNextPost(int $id): ?array
    {
        $post = Post::query()
            ->where('id', '>', $id)
            ->orderBy('id')
            ->select(['title', 'slug', 'category_id'])
            ->with('category:id,slug')->first();
        if (null !== $post) {
            return [
                'name' => $post->title,
                'slug' => 'learn-crypto/' . $post->category->slug . '/' . $post->slug,
            ];
        }

        return null;
    }
}
