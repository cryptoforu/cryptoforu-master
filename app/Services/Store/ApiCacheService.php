<?php

declare(strict_types=1);

namespace App\Services\Store;

use App\Contracts\ApiCacheContract;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;

class ApiCacheService implements ApiCacheContract
{
    private array $tags;

    public function __construct(array $tags)
    {
        $this->tags = $tags;
    }

    /**
     * Get Item From The Cache or Store If It Doesn't exist
     */
    public function load_data(
        string $key,
        mixed $callback,
        Carbon|int $ttl = 3600
    ): mixed {
        return Cache::tags($this->tags)
            ->remember(
                key: $key,
                ttl: $ttl,
                callback: $callback
            )
        ;
    }

    /**
     * Flush cache
     */
    public function flush_data(?array $tag = null): void
    {
        if (null === $tag) {
            Cache::flush();
        }
        Cache::tags($tag)->flush();
    }
}
