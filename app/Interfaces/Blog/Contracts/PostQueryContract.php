<?php

declare(strict_types=1);

namespace App\Interfaces\Blog\Contracts;

use App\Models\Post;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\QueryBuilder;

interface PostQueryContract
{
  /**
   * Get Single Post Query Builder
   * @param Post $post
   * @return Collection|Model|QueryBuilder
   */
  public function handle(Post $post): Collection|Model|QueryBuilder;
}
