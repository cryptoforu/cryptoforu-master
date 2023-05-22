<?php

declare(strict_types=1);

namespace App\Services\Crypto\Concerns;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Collection;

trait SendPoolRequest
{
    /**
     * Coin Gecko Pool Request
     *
     * @param  mixed  $item
     */
    public function pool(
        PendingRequest $request,
        string $method,
        array $param,
        int $nbPages,
        ?string $key,
        $value = null
    ): Collection {
        $col = collect();
        $collect = $request->pool(
            function (Pool $pool) use ($method, $param, $nbPages, $key, $value) {
                return collect()
                    ->range(1, $nbPages)
                    ->map(fn ($page) => $pool->get(
                        config('services.coingecko.base_url') . $method,
                        data_set($param, $key, $value ?? $page)
                    ));

            }
        );
        for ($page = 0; $page < $nbPages; $page++) {
            $col->put(...$collect[$page]->collect()->toArray());
        }

        return $col;
    }
}
