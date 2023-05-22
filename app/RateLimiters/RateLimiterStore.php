<?php

namespace App\RateLimiters;

use Illuminate\Support\Facades\Cache;
use Spatie\GuzzleRateLimiterMiddleware\Store;

class RateLimiterStore implements Store
{
    public function get(): array
    {
        return Cache::get('rate-limiter', []);
    }

    public function push(int $timestamp, int $limit)
    {
        Cache::put('rate-limiter', array_merge($this->get(), [$timestamp]));
    }
}
