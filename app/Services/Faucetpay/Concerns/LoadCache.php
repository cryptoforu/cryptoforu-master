<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Concerns;

use Illuminate\Support\Facades\Cache;

trait LoadCache
{
    /**
     * @return |mixed
     */
    public function load(string $key, mixed $data, int $ttl = 3600): mixed
    {
        return Cache::remember(
            'faucets-list-' . $key,
            $ttl,
            static fn () => $data
        );
    }
}
