<?php

declare(strict_types=1);

namespace App\Services\Crypto\Concerns;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Collection;

trait SendGetRequest
{
    /**
     * Coin Gecko Get Request
     */
    public function get(
        PendingRequest $request,
        string $method,
        ?array $param = []): Collection
    {
        return $request->get(
            url: $method,
            query: $param
        )->throw()->collect();
    }
}
