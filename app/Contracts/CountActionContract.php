<?php

declare(strict_types=1);

namespace App\Contracts;

use App\Models\Post;

interface CountActionContract
{
    public function get_count(string $uniqueKey): mixed;

    public function should_count(string $uniqueKey);

    public function count_views(Post $post, string $ip);
}
