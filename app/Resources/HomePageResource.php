<?php

declare(strict_types=1);

namespace App\Resources;

use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class HomePageResource extends JsonApiResource
{
    /**
     * @var string[]
     */
    public array $attributes = [
        'features',
        'social_links',
        'categories',
        'posts',
        'tags',
        'earn_categories',
        'popular',
        'latest_news',
        'exchanges',
    ];

    /**
     * @return array<string, mixed>
     */
    public function toAttributes(Request $request): array
    {

        return [
            'features' => $this['features'],
            'social_links' => $this['social_links'],
            'categories' => $this['categories'],
            'posts' => $this['posts'],
            'tags' => $this['tags'],
            'earn_categories' => $this['earn_categories'],
            'popular' => $this['popular'],
            'latest_news' => $this['latest_news'],
            'exchanges' => $this['exchanges'],
        ];
    }

    public function toId(Request $request): string
    {
        return 'home_data';
    }

    public function toType(Request $request): string
    {
        return 'home';
    }
}
