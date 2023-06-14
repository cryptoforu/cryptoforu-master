<?php

declare(strict_types=1);

namespace App\Services\Blog\ApiResource;

use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class PostResource extends JsonApiResource
{
    /**
     * @var string[]
     */
    public array $attributes = [
        'id',
        'title',
        'slug',
        'introduction',
        'content',
        'image_name',
        'category_id',
        'status',
    ];

    public function toAttributes(Request $request): array
    {

        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'introduction' => $this->introduction,
            'content' => $this->content,
            'image_name' => $this->image_name,
            'category_id' => $this->category_id,
            'status' => $this->status,

        ];
    }

    public function toRelationships(Request $request): array
    {
        return [
            'category' => CategoryResource::make($this->category),
            'tags' => TagsResource::collection($this->tags),
        ];
    }
}
