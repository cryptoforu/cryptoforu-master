<?php

declare(strict_types=1);

namespace App\Contracts;

use Closure;
use Illuminate\Support\Carbon;

interface ApiCacheContract
{
  public function load_data(
    string $key,
    Closure $callback,
    Carbon|int $ttl = 3600
  ): mixed;

  public function flush_data(?array $tag = null): void;
}
