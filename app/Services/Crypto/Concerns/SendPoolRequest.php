<?php

declare(strict_types=1);

namespace App\Services\Crypto\Concerns;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Pool;
use Illuminate\Support\Collection;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

trait SendPoolRequest
{
    use RequestState;

    /**
     * Coin Gecko Pool Request
     *
     *
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function pool(
        PendingRequest $request,
        string $method,
        array $param,
        ?string $key,
        ?int $max = 9,
        $value = null
    ): Collection {
        $col = collect();
        $pages = $this->set_state(
            key: 'page',
            by: 3,
            max: $max
        );
        $collect = $request->pool(
            function (Pool $pool) use ($method, $param, $key, $value, $pages) {
                return collect()
                    ->range($pages['from'], $pages['to'])
                    ->map(fn ($page) => $pool->get(
                        config('services.coingecko.base_url') . $method,
                        data_set($param, $key, $value ?? $page)
                    ));

            }
        );
        for ($page = 0; $page < 3; $page++) {
            if ($collect[$page]->successful()) {
                $col->push(...$collect[$page]->collect());
            }
        }

        return $col;
    }
}
