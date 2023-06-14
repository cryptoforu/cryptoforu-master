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
      key: 'page',
    );
  }

  public function coin_categories(
    Collection $collection,
    ?int $max = 12
  ): Collection {
    $state = settings()->get('category');
    $collect = $collection->keyBy('id')->map(fn($item) => $this->service->get(
      request: $this->client,
      method: 'coins/markets',
      param: [
        'vs_currency' => 'usd',
        'price_change_percentage' => '1h,24h,7d',
        'per_page' => '250',
        'category' => $item['id'],
      ],
    ));
    $this->service->set_state(
      from: $state['from'],
      to: $state['to'],
      key: 'category',
      max: $max,
    );

    return $collect;
  }

  public function exchanges(): Collection
  {
    return $this->service->get(
      request: $this->client,
      method: 'exchanges',
      param: [
        'per_page' => '250',
      ]
    );
  }
}
