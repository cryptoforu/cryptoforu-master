<?php

declare(strict_types=1);

namespace App\Services\Site\ApiResource;

use App\Services\Site\DataObjects\HomePage\FeaturesData;
use App\Services\Site\DataObjects\HomePage\HeroData;
use App\Services\Site\DataObjects\HomePage\SocialLinksData;
use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class HomeResource extends JsonApiResource
{
    /**
     * @var string[]
     */
    public $attributes = [
        'id',
        'data_name',
        'hero',
        'features',
        'social_links',
    ];

    /**
     * @return array<string, mixed>
     */
    public function toAttributes(Request $request): array
    {
        return [
            'id' => $this->id,
            'data_name' => $this->data_name,
            'hero' => fn () => HeroData::collection(items: $this->data_values['hero']),
            'features' => fn (
            ) => FeaturesData::collection(items: $this->data_values['features']),
            'social_links' => fn (
            ) => SocialLinksData::collection(items: $this->data_values['social_links']),
        ];
    }
}
