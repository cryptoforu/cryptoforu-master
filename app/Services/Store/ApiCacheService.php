<?php

declare(strict_types=1);

namespace App\Services\Store;

use App\Contracts\ApiCacheContract;
use Illuminate\Support\Facades\Cache;

class ApiCacheService implements ApiCacheContract
{
    private array $tags;

    public function __construct(array $tags)
    {
        $this->tags = $tags;
    }

    /**
     * @return |mixed
     */
    public function load_data(string $key, mixed $callback): mixed
    {
        return Cache::tags($this->tags)
            ->rememberForever(
                key: $key,
                callback: $callback
            )
        ;

    }

    public function flush_data(): void
    {
        Cache::tags($this->tags)->flush();
    }
}
