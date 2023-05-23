<?php

declare(strict_types=1);

namespace App\Services\Crypto\DataObjects;

use App\Services\Crypto\Transformers\CurrencyTransformer;
use App\Services\Crypto\Transformers\PercentageTransformer;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CryptoCoin')]
final class CryptoCoin extends Data
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
            id: (string) (data_get($markets, 'id')),
            name: (string) (data_get($markets, 'name')),
            image: (string) (data_get($markets, 'image')),
            current_price: (float) (data_get($markets, 'current_price')),
            market_cap: (int) (data_get($markets, 'market_cap')),
            market_cap_rank: (int) (data_get($markets, 'market_cap_rank')),
            total_volume: (int) (data_get($markets, 'total_volume')),
            high_24h: (float) (data_get($markets, 'high_24h')),
            low_24h: (float) (data_get($markets, 'low_24h')),
            price_change_24h: (float) (data_get($markets, 'price_change_24h')),
            price_change_percentage_24h: (float) (data_get($markets, 'price_change_percentage_24h')),
            price_change_percentage_1h_in_currency: (float) (data_get($markets, 'price_change_percentage_1h_in_currency')),
            price_change_percentage_24h_in_currency: (float) (data_get($markets, 'price_change_percentage_24h_in_currency')),
            price_change_percentage_7d_in_currency: (float) (data_get($markets, 'price_change_percentage_7d_in_currency')),
            symbol: Str::upper(data_get($markets, 'symbol')),
        );
    }

    public static function make(Collection $attributes): Collection
    {
        return $attributes->flatMap(
            fn ($item) => self::new(
                collection: $item
            )
        );
    }

    public static function new(Collection $collection): Collection
    {
        return $collection->map(
            fn ($item) => self::fromArray(
                markets: $item
            )
        );
    }
}
