<?php

declare(strict_types=1);

namespace App\Services\Faucetpay;

use App\Interfaces\Faucetpay\HandleListContract;
use App\Services\Faucetpay\DataFactory\FaucetDataFactory;
use Illuminate\Http\Client\PendingRequest;

final readonly class FaucetPayListResource
{
    public function __construct(
        private FaucetPayService $service,
        private PendingRequest $client
    ) {
    }

    public function make_list(
        HandleListContract $listContract,
    ): void {
        $factory = new FaucetDataFactory();
        $req = $this->service->getList(
            request: $this->client
        )['normal'];
        $listContract->handle(
            collection: $factory->collection(
                collection: collect($req)
            )
        );
    }
}
