<?php

declare(strict_types=1);

namespace App\Responses;

use JustSteveKing\StatusCode\Http;

final class JsonResponse extends Response
{
    /**
     * Return Json Response
     */
    public function __construct(
        protected readonly mixed $data,
        protected readonly Http $status = Http::OK,
    ) {
    }
}
