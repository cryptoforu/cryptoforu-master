<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Http\Requests\UpdatePostRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Post;
use Illuminate\Support\Str;

final class UpdatePost
{
    /**
     * Update Post Instance
     */
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    public function handle(UpdatePostRequest $request, Post $post): bool
    {
        $validated = $request->validated();

        if ($request->hasFile('featured_image')) {
            $image = $this->library->store(
                file: $validated['featured_image'],
                directory: '/posts'
            );
            $post->featured_image = $image['path'];
            $post->image_name = $image['file_name'];
            $post->thumb = $image['thumb'];
            if ( ! empty($post->images)) {
                foreach ($post->images as $img) {
                    $this->library->delete($img);
                }
                $this->library->new(
                    model: $post,
                    file: $image,
                    category: 1,
                );
            }
        }
        $request->collect()->except(['_method'])->map(function ($item, $key) use (
            $post
        ): void {
            $post->{$key} = $item;
        });
        if (empty($request->safe())) {
            return false;
        }
        $post->slug = Str::slug($validated['title']);
        $post->excerpt = Str::of($validated['introduction'])->limit(165, '...');
        if ($request->has('tags')) {
            $post->tags()->attach($validated['tags']);
        }
        $post->save();

        return true;
    }
}
