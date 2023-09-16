<?php

declare(strict_types=1);

namespace App\Services\Blog\Actions;

use App\Http\Requests\UpdatePostRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Post;
use Illuminate\Support\Str;

final readonly class UpdatePost
{
  /**
   * Update Post Instance
   */
  public function __construct(
    private LibraryActionsInterface $library,
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
      $post->featured_image = $image['image_url'];
      $post->image_name = $image['file_name'];
      if (!empty($post->images)) {
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
    $request->collect()->except(['_method', 'tags'])->map(function (
      $item,
      $key
    ) use (
      $post
    ): void {
      $post->{$key} = $item;
    });
    if (empty($request->safe())) {
      return false;
    }
    $count = Str::wordCount($validated['title']);
    $words = Str::of($validated['title'])->words($count / 2, '');
    $slice = Str::of($validated['title'])->replaceFirst($words, $words.' |');
    $post->headline = $slice;
    $post->slug = Str::slug($validated['title']);
    $post->excerpt = Str::of($validated['introduction'])->excerpt(' ');
    $post->post_links = [
      'post_link' => '/learn-crypto/'.$post->category->slug.'/'.$post->slug,
      'next' => Post::query()->ofNext($post->id),
      'prev' => Post::query()->ofPrev($post->id),
    ];
    if ($request->has('tags')) {
      $post->tags()->sync($validated['tags']);

    }
    $post->save();

    return true;
  }
}
