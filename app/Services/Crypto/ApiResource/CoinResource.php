<?php

declare(strict_types=1);

namespace App\Services\Crypto\ApiResource;

use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResource;

class CoinResource extends JsonApiResource
{
    public array $attributes = [
        'id',
        'name',
        'image',
        'current_price',
        'market_cap',
        'market_cap_rank',
        'total_volume',
        'high_24h',
        'low_24h',
        'price_change_24h',
        'price_change_percentage_24h',
        'price_change_percentage_1h_in_currency',
        'price_change_percentage_24h_in_currency',
        'price_change_percentage_7d_in_currency',
        'symbol',
    ];

    public function toAttributes(Request $request): array
    {
        return [
            'id' => $this['id'],
            'name' => $this['name'],
            'image' => $this['image'],
            'current_price' => $this['current_price'],
            'market_cap' => $this['market_cap'],
            'market_cap_rank' => $this['market_cap_rank'],
            'total_volume' => $this['total_volume'],
            'high_24h' => $this['high_24h'],
            'low_24h' => $this['low_24h'],
            'price_change_24h' => $this['price_change_24h'],
            'price_change_percentage_24h' => $this['price_change_percentage_24h'],
            'price_change_percentage_1h_in_currency' => $this['price_change_percentage_1h_in_currency'],
            'price_change_percentage_24h_in_currency' => $this['price_change_percentage_24h_in_currency'],
            'price_change_percentage_7d_in_currency' => $this['price_change_percentage_7d_in_currency'],
            'symbol' => $this['symbol'],
        ];
    }

    public function toId(Request $request): string
    {
        return $this['id'];
    }

    public function toType(Request $request): string
    {
        return 'coins';
    }
}
