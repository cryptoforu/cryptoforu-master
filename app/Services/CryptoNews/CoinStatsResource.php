<?php

declare(strict_types=1);

namespace App\Services\CryptoNews;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Collection;

final class CoinStatsResource
{
  public function __construct(
    private readonly PendingRequest $client,
  ) {
  }

  /**
   * Latest Coin Stats News
   *
   * @return Collection
   * @throws RequestException
   */
  public function latest(): Collection
  {

    return $this->client->get(
      url: 'news/latest',
      query: [
        'skip' => '0',
        'limit' => '3',
      ]
    )->throw()->collect('news');
  }
}
