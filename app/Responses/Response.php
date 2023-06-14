<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Contracts\Support\Responsable;
use Illuminate\Http\JsonResponse;

class Response implements Responsable
{
    /**
     * {@inheritDoc}
     */
    public function toResponse(
        $request
    ): JsonResponse|\Symfony\Component\HttpFoundation\Response {
        return new JsonResponse(
            data: $this->data,
            status: $this->status->value,
        );
    }
}
