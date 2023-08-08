<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Http\JsonResponse;
use JustSteveKing\StatusCode\Http;

trait SendResponse
{
    /**
     * @property-read mixed $data
     * @property-read Http $status
     */
    public function toResponse($request): JsonResponse
    {
        return new JsonResponse(
            data: $this->data,
            status: $this->status->value,
        );
    }
}
