<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Support\Collection;
use JustSteveKing\StatusCode\Http;
use TiMacDonald\JsonApi\JsonApiResource;
use TiMacDonald\JsonApi\JsonApiResourceCollection;

final class CollectionResponse extends Response
{
    public function __construct(
        protected readonly Collection|JsonApiResource|JsonApiResourceCollection|array $data,
        protected readonly Http $status = Http::OK,
    ) {
    }
}
