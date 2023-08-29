<?php

declare(strict_types=1);

namespace App\Services\Faucetpay;

use App\Contracts\ApiCacheContract;
use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Services\Faucetpay\Concerns\BuildRequests;
use App\Services\Faucetpay\Concerns\LoadCache;
use App\Services\Faucetpay\Concerns\Sortable;
use Illuminate\Http\Client\PendingRequest;

final class FaucetPayService implements FaucetPayServiceInterface
{
    use BuildRequests;
    use LoadCache;
    use Sortable;

    protected ApiCacheContract $cache;

    protected PendingRequest $client;

    public function __construct(
        ApiCacheContract $cache,
        PendingRequest $client
    ) {
        $this->client = $client;
        $this->cache = $cache;
    }

    public function list(): FaucetPayListResource
    {
        return new FaucetPayListResource(
            service: $this,
            client: $this->client,
        );
    }
}
