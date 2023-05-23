<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Collection;

final class CryptoResource
{
    public function __construct(
        private readonly CryptoService $service,
        private readonly PendingRequest $client,
    ) {
    }

    public function price(string $coin): Collection
    {
        return $this->service->get(
            request: $this->client,
            method: 'simple/price',
            param: [
                'vs_currencies' => 'usd',
                'ids' => $coin,
            ]
        );
    }

    public function categories(): Collection
    {
        return $this->service->get(
            request: $this->client,
            method: 'coins/categories',
            param: [
                'order' => 'market_cap_change_24h_desc',
            ]
        );
    }

    public function coins(): Collection
    {
        return $this->service->pool(
            request: $this->client,
            method: 'coins/markets',
            param: [
                'vs_currency' => 'usd',
                'price_change_percentage' => '1h,24h,7d',
                'per_page' => '250',
                'page' => '',
            ],
            nbPages: 5,
            key: 'page',
        );
    }
}
