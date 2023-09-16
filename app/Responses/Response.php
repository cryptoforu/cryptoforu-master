<?php

/** @noinspection ALL */

/** @noinspection ALL */

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use JustSteveKing\StatusCode\Http;

class Response implements Responsable
{
  /**
   * @property-read mixed $data
   * @property-read Http $status
   */
  public function toResponse(
    $request
  ): JsonResponse
  {
    return new JsonResponse(
      data: $this->data,
      status: $this->status->value,
    );
  }
}
