<?php

declare(strict_types=1);

namespace App\Services\Crypto;

use App\Services\Crypto\Concerns\RequestState;
use App\Services\Crypto\Concerns\SendGetRequest;
use App\Services\Crypto\Concerns\SendPoolRequest;
use App\Traits\Replaceable;
use Illuminate\Http\Client\PendingRequest;

final class CryptoService
{
    use Replaceable;
    use RequestState;
    use SendGetRequest;
    use SendPoolRequest;

    public function __construct(
        private readonly PendingRequest $client
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
