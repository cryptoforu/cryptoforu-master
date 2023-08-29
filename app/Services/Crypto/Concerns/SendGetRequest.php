<?php

declare(strict_types=1);

namespace App\Services\Crypto\Concerns;

use GuzzleHttp\Promise\PromiseInterface;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Client\Response;

trait SendGetRequest
{
    /**
     * Coin Gecko Get Request
     *
     * @throws RequestException
     */
    public function get(
        PendingRequest $request,
        string $method,
        ?array $param = []
    ): PromiseInterface|Response {
        return $request->get(
            url: $method,
            query: $param
        )->throw();
    }
}
