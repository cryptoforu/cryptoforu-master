<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use Cerbero\JsonParser\JsonParser;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
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
    public function price(string $coin): Collection
    {
        return $this->service->get(
            request: $this->client,
            method: 'simple/price',
            param: [
                'vs_currencies' => 'usd',
                'ids' => $coin,
            ]
        )->collect();
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
        return $this->service->pool(
            request: $this->client,
            method: 'coins/markets',
            param: [
                'vs_currency' => 'usd',
                'price_change_percentage' => '1h,24h,7d',
                'per_page' => '250',
                'page' => '',
            ],
            key: 'page',
        );
    }

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function coin_categories(
        Collection $collection,
        ?int $max = 12
    ): Collection {
        $state = settings()->get('category');
        $collect = $collection->keyBy('id')->map(fn (
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
        )->collect());
        $this->service->set_state(
            from: $state['from'],
            to: $state['to'],
            key: 'category',
            max: $max,
        );

        return $collect;
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

    /**
     * Get FaucetPay Coins
     *
     * @throws RequestException
     */
    public function fp_coins(): Collection
    {
        return $this->service->get(
            request: $this->client,
            method: 'coins/markets',
            param: [
                'vs_currency' => 'usd',
                'ids' => 'bitcoin,ethereum,tether,binancecoin,solana,dogecoin,tron,litecoin,bitcoin-cash,zcash,dash,digibyte,feyorra,matic-network,ripple,cardano',
            ],
        )->collect();
    }
}
