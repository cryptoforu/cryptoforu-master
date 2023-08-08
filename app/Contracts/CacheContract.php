<?php

declare(strict_types=1);

namespace App\Contracts;

use Closure;

interface CacheContract
{
    /**
     * Lazy Load Data
     */
    public function load(string $key, Closure $callback, int $ttl = 1440): mixed;
}
