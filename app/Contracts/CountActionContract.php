<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Post;

interface CountActionContract
{
  public function should_count(Post $post, string $ip);

  public function count_views(Post $post, string $ip);


}
