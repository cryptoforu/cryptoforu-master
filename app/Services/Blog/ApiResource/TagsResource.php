<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class TagsResource extends JsonApiResource
{
    /**
     * @var string[]
     */
    public array $attributes = [
        'id',
        'name',
    ];

    public function toAttributes(Request $request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->title,
        ];
    }

    public function toRelationships(Request $request): array
    {
        return [
            'posts' => PostResource::make($this->posts),
        ];
    }
}
