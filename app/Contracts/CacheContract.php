<?php

declare(strict_types=1);

namespace App\Contracts;

use Closure;

interface CacheContract
{
  /**
   * Lazy Load Data
   * @param  string  $key
   * @param  Closure  $callback
   * @param  int  $ttl
   * @return mixed
   */
  public function load(string $key, Closure $callback, int $ttl = 1440): mixed;
}
