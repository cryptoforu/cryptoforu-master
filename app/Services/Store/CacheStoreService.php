<?php

declare(strict_types=1);

namespace App\Services\Store;

use App\Contracts\CacheContract;
use Closure;
use DateInterval;
use DateTimeInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Valuestore\Valuestore;

final class CacheStoreService extends Valuestore implements CacheContract
{
    public function withInertia(Collection $collection): array
    {
        $first = $collection->take(1)->map(fn ($item, $key) => fn (
        ) => $this->load(
            key: $key,
            callback: fn () => $item,
        ))->all();
        $rest = $collection->skip(1)->map(fn ($item, $key) => Inertia::lazy(
            fn () => $this->load(
                key: $key,
                callback: fn () => $item,
            )
        ))->all();

        return collect(
            value: [...$first, ...$rest]
        )->toArray();
    }

    /**
     * Lazy Load Data
     */
    public function load(
        string $key,
        Closure $callback,
        Closure|DateInterval|DateTimeInterface|int|null $ttl = 1440
    ): mixed {
        return Cache::remember(
            key: $this->get($key) ?? $this->generate_key($key),
            ttl: $ttl,
            callback: $callback,
        );
    }

    /**
     * Generate Unique Cache Key
     */
    private function generate_key(string $key): mixed
    {
        $this->put(
            name: $key,
            value: (string) Str::orderedUuid()
        );

        return $this->get(name: $key);
    }
}
