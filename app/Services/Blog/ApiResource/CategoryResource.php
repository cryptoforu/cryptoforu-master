<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class CategoryResource extends JsonApiResource
{
    /**
     * @var string[]
     */
    public array $attributes = [
        'id',
        'name',
        'description',
        'slug',
        'category_image',
        'category_thumb',
    ];

    public function toAttributes(Request $request): array
    {

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'slug' => $this->slug,
            'category_image' => $this->category_image,
            'category_thumb' => $this->category_thumb,

        ];
    }

    public function toRelationships(Request $request): array
    {
        return [
            'posts' => fn () => PostResource::collection($this->posts),
        ];
    }
}
