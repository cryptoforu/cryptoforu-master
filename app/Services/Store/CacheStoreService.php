<?php

declare(strict_types=1);

namespace App\Services\Store;

use Closure;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Valuestore\Valuestore;

final class CacheStoreService extends Valuestore
{
    public function withInertia(Collection $collection): array
    {
        $first = $collection->take(1)->map(fn ($item, $key) => fn () => $this->load(
            key: $key,
            callback: fn () => $item,
        ))->all();
        $rest = $collection->skip(1)->map(fn ($item, $key) => Inertia::lazy(
            fn () => $this->load(
                key: $key,
                callback: fn () => $item,
            )
        ))->all();

        return (new Collection(
            items: [...$first, ...$rest]
        ))->toArray();
    }

    public function load(string $key, Closure $callback, int $ttl = 1440): mixed
    {
        return Cache::remember(
            key: $this->get($key) ?? $this->generate_key($key),
            ttl: $ttl,
            callback: $callback,
        );
    }

    private function generate_key(string $key)
    {
        $this->put(
            name: $key,
            value: (string) Str::orderedUuid()
        );

        return $this->get(name: $key);

    }
}
