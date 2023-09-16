<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use Cerbero\JsonParser\JsonParser;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Collection;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

final readonly class CryptoResource
{
    public function __construct(
        private CryptoService $service,
        private PendingRequest $client,
    ) {
    }

    /**
     * Get Coin Price
     *
     * @throws RequestException
     */
    public function price(string $coin): Response
    {
        return $this->service->get(
            request: $this->client,
            method: 'coins/markets',
            param: [
                'vs_currency' => 'usd',
                'ids' => $coin,
            ]
        );
    }

    /**
     * Get Crypto Categories
     *
     * @throws RequestException
     */
    public function categories(): JsonParser
    {
        return JsonParser::parse(
            $this->service->get(
                request: $this->client,
                method: 'coins/categories',
            )
        );
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function coins(): Collection
    {
        $state = $this->service->set_state(
            key: 'page',
            by: 3,
            max: 9
        );

        return collect()->range($state['from'], $state['to'])->map(
            fn ($page) => $this->service->get(
                request: $this->client,
                method: 'coins/markets',
                param: [
                    'vs_currency' => 'usd',
                    'price_change_percentage' => '1h,24h,7d',
                    'per_page' => '250',
                    'page' => $page,
                ]
            )
        );

    }

    public function coin_categories(
        Collection $collection,
    ): Collection {
        return $collection->keyBy('id')->map(
            fn (
                $item
            ) => $this->service->get(
                request: $this->client,
                method: 'coins/markets',
                param: [
                    'vs_currency' => 'usd',
                    'price_change_percentage' => '1h,24h,7d',
                    'per_page' => '250',
                    'category' => $item['id'],
                ],
            )
        );
    }

    /**
     * Crypto Exchanges
     *
     * @throws RequestException
     */
    public function exchanges(): JsonParser
    {
        return JsonParser::parse(
            source: $this->service->get(
                request: $this->client,
                method: 'exchanges',
                param: [
                    'per_page' => '250',
                ]
            )
        );
    }
}
