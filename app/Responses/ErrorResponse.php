<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use JustSteveKing\StatusCode\Http;

final class ErrorResponse implements Responsable
{
    use SendResponse;

    public function __construct(
        protected readonly array $message,
        protected readonly Http $code = Http::INTERNAL_SERVER_ERROR,
    ) {
    }
}
