<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use App\Services\Crypto\Concerns\SendGetRequest;
use App\Services\Crypto\Concerns\SendPoolRequest;
use Illuminate\Http\Client\PendingRequest;

final class CryptoService
{
    use SendGetRequest, SendPoolRequest;

    public function __construct(
        private PendingRequest $client
    ) {
    }

    public function crypto(): CryptoResource
    {
        return new CryptoResource(
            service: $this,
            client: $this->client,
        );
    }
}
