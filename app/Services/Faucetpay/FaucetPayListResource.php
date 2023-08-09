<?php

declare(strict_types=1);

namespace App\Services\Faucetpay;

use App\Services\Faucetpay\DataFactory\FaucetDataFactory;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\LazyCollection;

final readonly class FaucetPayListResource
{
    public function __construct(
        private FaucetPayService $service,
        private PendingRequest $client,
    ) {
    }

    public function make_list(): LazyCollection
    {
        $factory = new FaucetDataFactory();
        $req = $this->service->getList(
            request: $this->client
        )['normal'];

        return $factory->collection(collection: collect($req));

    }
}
