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
        $image = $this->library->store(
            file: $validated['featured_image'],
            directory: 'posts'
        );
        $image_path = $image['image_url'];
        $image_name = $image['file_name'];
        $count = Str::wordCount($validated['title']);
        $words = Str::of($validated['title'])->words($count / 2, '');
        $slice = Str::of($validated['title'])->replaceFirst($words, $words . ' |');
        $post = Post::query()->create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']),
            'introduction' => $validated['introduction'],
            'content' => $validated['content'],
            'featured_image' => $image_path,
            'category_id' => $validated['category_id'],
            'status' => $validated['status'],
            'image_name' => $image_name,
            'excerpt' => 'a',
            'headline' => $slice,
        ]);

        if ($request->has('tags')) {
            $post->tags()->attach($validated['tags']);
        }

        $post->post_links = [
            'post_link' => '/learn-crypto/' . $post->category->slug . '/' . $post->slug,
            'next' => Post::query()->ofNext($post->id),
            'prev' => Post::query()->ofPrev($post->id),
        ];
        $post->images()->create(
            attributes: [
                ...$image,
                'library_category_id' => 1,
            ]
        );
        cache()->flush();
        $post->save();

        return true;
    }
}
