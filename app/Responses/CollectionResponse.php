<?php

declare(strict_types=1);

namespace App\Responses;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use JustSteveKing\StatusCode\Http;
use Spatie\LaravelData\Data;
use TiMacDonald\JsonApi\JsonApiResource;
use TiMacDonald\JsonApi\JsonApiResourceCollection;

final class CollectionResponse extends Response
{
  public function __construct(
    protected readonly Collection|JsonApiResource|JsonApiResourceCollection|JsonResource|array|Data|Model $data,
    protected readonly Http $status = Http::OK,
  ) {
  }
}
