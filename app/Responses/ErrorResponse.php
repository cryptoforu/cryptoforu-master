<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;
use JustSteveKing\StatusCode\Http;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;

final class ErrorResponse implements Responsable
{
  public function __construct(
    private readonly string $message,
    private readonly ?Throwable $exception = null,
    private readonly Http $code = Http::INTERNAL_SERVER_ERROR,
    private readonly array $headers = []
  ) {
  }

  public function toResponse($request): JsonResponse|ResponseAlias
  {
    $response = ['message' => $this->message];

    if (null !== $this->exception && config('app.debug')) {
      $response['debug'] = [
        'message' => $this->exception->getMessage(),
        'file' => $this->exception->getFile(),
        'line' => $this->exception->getLine(),
        'trace' => $this->exception->getTraceAsString(),
      ];
    }

    return response()->json($response, $this->code, $this->headers);
  }
}
