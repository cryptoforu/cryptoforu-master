<?php

declare(strict_types=1);

namespace App\Services\Site\ApiResource;

use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class SiteResource extends JsonApiResource
{
    /**
     * @var string[]
     */
    public $attributes = [
        'id',
        'data_name',
        'data_values',
    ];

    /**
     * @return array<string, mixed>
     */
    public function toAttributes(Request $request): array
    {
        return [
            'id' => $this->id,
            'data_name' => $this->data_name,
            'data_values' => $this->data_values,
        ];
    }

    public function toType(Request $request)
    {
        return 'Sites';
    }
}
