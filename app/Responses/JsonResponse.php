<?php

namespace App\Responses;

use JustSteveKing\StatusCode\Http;

final class JsonResponse extends Response
{
  /**
   * Return Json Response
   * @param  mixed  $data
   * @param  Http  $status
   */
  public function __construct(
    protected readonly mixed $data,
    protected readonly Http $status = Http::OK,
  ) {
  }
}
