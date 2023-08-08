<?php

declare(strict_types=1);

namespace App\Services\Site\ApiResource;

use App\Services\Site\DataObjects\HomePage\FeaturesData;
use App\Services\Site\DataObjects\HomePage\FooterNavData;
use App\Services\Site\DataObjects\HomePage\HeroData;
use App\Services\Site\DataObjects\HomePage\SocialLinksData;
use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class HomeResource extends JsonApiResource
{
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
            'footer_nav' => fn (
            ) => FooterNavData::collection(items: $this->data_values['footer_nav']),
        ];
    }

    public function toType(Request $request): string
    {
        return 'Sites';
    }
}
