<?php

declare(strict_types=1);

namespace App\Services\Crypto\DataObjects;

use App\Services\Crypto\Transformers\CurrencyTransformer;
use App\Services\Crypto\Transformers\PercentageTransformer;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CryptoCategories')]
final class CryptoCategories extends Data
{
    public function __construct(
        public readonly ?string $id,
        public readonly ?string $name,
        #[WithTransformer(CurrencyTransformer::class)]
        public ?float $market_cap,
        #[WithTransformer(PercentageTransformer::class, divide: 100)]
        public readonly ?float $market_cap_change_24h,
        public readonly ?array $top_3_coins,
        #[WithTransformer(CurrencyTransformer::class)]
        public ?float $volume_24h
    ) {
    }

    public static function fromArray(array $attributes): self
    {
        return new self(
            id: (string) (data_get($attributes, 'id')),
            name: (string) (data_get($attributes, 'name')),
            market_cap: data_get($attributes, 'market_cap'),
            market_cap_change_24h: (data_get($attributes, 'market_cap_change_24h')),
            top_3_coins: data_get($attributes, 'top_3_coins'),
            volume_24h: data_get($attributes, 'volume_24h'),
        );
    }

    public static function make(Collection $attributes): Collection
    {
        return $attributes->map(
            fn ($item) => self::fromArray(
                attributes: $item
            )
        )->keyBy('id')->sortByDesc('market_cap')->values();
    }
}
