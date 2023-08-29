<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

final class RedirectSuccess implements Responsable
{
    /**
     * Redirect Success Response
     */
    public function __construct(
        public readonly string $url,
        public readonly string $message,
        private mixed $parameters = [],
        private int $code = ResponseAlias::HTTP_FOUND,
        private array $headers = [],
    ) {
    }

    /**
     * Undocumented function
     */
    public function toResponse($request): RedirectResponse
    {
        return to_route(
            route: $this->url,
            parameters: $this->parameters,
            status: $this->code,
            headers: $this->headers,
        )->with('success', $this->message);
    }
}
