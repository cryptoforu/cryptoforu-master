<?php

declare(strict_types=1);

namespace App\Responses;

use JustSteveKing\StatusCode\Http;

final class ErrorResponse extends Response
{
  public function __construct(
    protected readonly array $message,
    protected readonly Http $status = Http::INTERNAL_SERVER_ERROR,
  ) {
  }
}
