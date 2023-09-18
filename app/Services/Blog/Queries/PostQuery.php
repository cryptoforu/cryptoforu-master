<?php

declare(strict_types=1);

namespace App\Services\Blog\Queries;

use App\Interfaces\Blog\Contracts\PostQueryContract;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\QueryBuilder;

final class PostQuery implements PostQueryContract
{
  public function handle(): Builder
  {
    return QueryBuilder::for(
      subject: Post::class
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
      ->getEloquentBuilder();
  }
}
