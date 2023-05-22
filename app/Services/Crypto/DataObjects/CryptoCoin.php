<?php

namespace App\Services\Crypto\DataObjects;

use App\Services\Crypto\Transformers\CurrencyTransformer;
use App\Services\Crypto\Transformers\PercentageTransformer;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CryptoCoin')]
class CryptoCoin extends Data
{
    public function __construct(
        public readonly string $id,
        public readonly string $name,
        public readonly string $image,
        #[WithTransformer(CurrencyTransformer::class)]
        public readonly ?float $current_price,
        #[WithTransformer(CurrencyTransformer::class)]
        public readonly ?float $market_cap,
        public readonly ?int $market_cap_rank,
        public readonly ?int $total_volume,
        #[WithTransformer(CurrencyTransformer::class)]
        public readonly ?float $high_24h,
        #[WithTransformer(CurrencyTransformer::class)]
        public readonly ?float $low_24h,
        #[WithTransformer(CurrencyTransformer::class)]
        public readonly ?float $price_change_24h,
        #[WithTransformer(PercentageTransformer::class)]
        public readonly ?float $price_change_percentage_24h,
        #[WithTransformer(PercentageTransformer::class)]
        public readonly ?float $price_change_percentage_1h_in_currency,
        #[WithTransformer(PercentageTransformer::class)]
        public readonly ?float $price_change_percentage_24h_in_currency,
        #[WithTransformer(PercentageTransformer::class)]
        public readonly ?float $price_change_percentage_7d_in_currency,
        public readonly string $symbol,
    ) {
    }

    public static function fromArray(array $markets): self
    {
        return new self(
            id: strval(data_get($markets, 'id')),
            name: strval(data_get($markets, 'name')),
            image: strval(data_get($markets, 'image')),
            current_price: floatval(data_get($markets, 'current_price')),
            market_cap: intval(data_get($markets, 'market_cap')),
            market_cap_rank: intval(data_get($markets, 'market_cap_rank')),
            total_volume: intval(data_get($markets, 'total_volume')),
            high_24h: floatval(data_get($markets, 'high_24h')),
            low_24h: floatval(data_get($markets, 'low_24h')),
            price_change_24h: floatval(data_get($markets, 'price_change_24h')),
            price_change_percentage_24h: floatval(data_get($markets, 'price_change_percentage_24h')),
            price_change_percentage_1h_in_currency: floatval(data_get($markets, 'price_change_percentage_1h_in_currency')),
            price_change_percentage_24h_in_currency: floatval(data_get($markets, 'price_change_percentage_24h_in_currency')),
            price_change_percentage_7d_in_currency: floatval(data_get($markets, 'price_change_percentage_7d_in_currency')),
            symbol: Str::of(data_get($markets, 'symbol'))->upper()
        );
    }

    public static function make(Collection $attributes): Collection
    {
        return $attributes->map(
            fn ($item) => static::fromArray(
                markets: $item
            )
        );
    }
}
