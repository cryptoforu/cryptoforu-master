<?php

declare(strict_types=1);

namespace App\Services\Earn\ApiResource;

use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class EarnCategoryResource extends JsonApiResource
{
    /**
     * @var string[]
     */
    public array $attributes = [
        'id',
        'name',
        'description',
        'category_image',
        'earn',
    ];

    public function toAttributes(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'category_image' => $this->category_image,
            'earn' => $this->earn,
        ];
    }
}
