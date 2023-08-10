<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use JustSteveKing\StatusCode\Http;

final readonly class JsonResourceResponse implements Responsable
{
  public function __construct(
    public array $data,
    public Http $status = Http::OK,
  ) {
  }

  public function toResponse($request): JsonResponse
  {
    return new JsonResponse(
      data: $this->data,
      status: $this->status->value,
    );
  }
}
