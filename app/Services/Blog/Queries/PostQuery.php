<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Interfaces\Blog\Contracts\PostQueryContract;
use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\QueryBuilder;

final class PostQuery implements PostQueryContract
{
  public function handle(Post $post): Collection|Model|QueryBuilder
  {
    return QueryBuilder::for(
      subject: Post::query()->where('id', $post->id)
    )
      ->allowedFields([
        'id',
        'slug',
        'category_id',
        'status',
        'categories.id',
        'categories.slug',
      ])
      ->with('category')
      ->first();
  }
}
