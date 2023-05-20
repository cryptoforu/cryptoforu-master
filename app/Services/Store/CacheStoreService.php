<?php

namespace App\Services\Store;

use App\Contracts\CacheStoreContract;
use Illuminate\Cache\Repository;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Spatie\Valuestore\Valuestore;

class CacheStoreService extends Valuestore implements CacheStoreContract
{
    /**
     * @var string
     */
    public function __construct(
        private Repository $store,
        private Valuestore $valuestore,
    ) {
    }

    public function load(string $key, $callback): mixed
    {
        $uniqueKey = $this->generateKey(name: $key);
        $data = $this->store->rememberForever(
            key: $uniqueKey,
            callback: function () use ($callback) {
                return $callback;
            }
        );

        return $data;
    }

    public function generateKey(string|array $name): string
    {
        $uniqueKey = uniqid();
        $value = '';
        if ($this->valuestore->has(name: $name)) {
            $value = $this->valuestore->get(name: $name);

            return $value;
        } else {
            $this->valuestore->put(name: $name, value: $uniqueKey);
            $value = $this->valuestore->get(name: $name);

            return $value;
        }
    }

    public function flushCache(
        string $tag = '',
        string $action = 'all',
        string $key = ''
    ): void {
        $uniqueKey = $this->generateKey(name: $key);
        switch ($action) {
            case 'all':
                $this->store->clear();
                $this->valuestore->flush();

                break;
            case 'key':
                $this->store->forget(
                    key: $uniqueKey
                );
        }
    }

    public function withInertia(Collection $collection): array
    {
        $first = $collection->take(1)->map(fn ($item, $key) => fn () => $this->load(
            key: $key,
            callback: $item
        ))->all();
        $rest = $collection->skip(1)->map(fn ($item, $key) => Inertia::lazy(
            fn () => $this->load(
                key: $key,
                callback: $item,
            )
        ))->all();

        return (new Collection(
            items: [...$first, ...$rest]
        ))->toArray();
    }
}
