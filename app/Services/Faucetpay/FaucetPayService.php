<?php

declare(strict_types=1);

namespace App\Services\Faucetpay;

use App\Contracts\ApiCacheContract;
use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Services\Faucetpay\Concerns\BuildRequests;
use App\Services\Faucetpay\Concerns\LoadCache;
use Illuminate\Http\Client\PendingRequest;

class FaucetPayService implements FaucetPayServiceInterface
{
  use BuildRequests;
  use LoadCache;

  /**
   * @param  PendingRequest  $client
   * @param  ApiCacheContract  $cache
   */
  public function __construct(
    private readonly PendingRequest $client,
    public readonly ApiCacheContract $cache,
  ) {
  }

  /**
   * @return FaucetPayListResource
   */
  public function list(): FaucetPayListResource
  {
    return new FaucetPayListResource(
      service: $this,
      client: $this->client,
    );
  }
}
