<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Http\Requests\StorePostRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Post;
use Illuminate\Support\Str;

final class StorePost
{
    /**
     * Store Post Instance
     */
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    /**
     * Store New Post
     */
    public function handle(StorePostRequest $request): bool
    {
        $validated = $request->validated();

        if ($request->hasFile('featured_image')) {
            $image = $this->library->store(
                file: $validated['featured_image'],
                directory: '/posts'
            );
            $image_path = $image['path'];
            $image_name = $image['file_name'];
            $image_thumb = $image['thumb'];
        }

        $post = Post::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'introduction' => $validated['introduction'],
            'content' => $validated['content'],
            'featured_image' => $image_path,
            'thumb' => $image_thumb,
            'category_id' => $validated['category_id'],
            'status' => $validated['status'],
            'image_name' => $image_name,
            'excerpt' => Str::of($validated['introduction'])->limit(165, '...'),
        ]);

        if ($request->has('tags')) {
            $post->tags()->attach($validated['tags']);
        }

        $this->library->save(
            model: $post,
            file: $image,
            category: 1
        );

        return true;
    }
}
