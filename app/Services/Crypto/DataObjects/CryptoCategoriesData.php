<?php

declare(strict_types=1);

namespace App\Services\Crypto\DataObjects;

use App\Services\Crypto\Transformers\CurrencyTransformer;
use App\Services\Crypto\Transformers\PercentageTransformer;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CryptoCategoriesData')]
final class CryptoCategoriesData extends Data
{
    public function __construct(
        public readonly ?string $id,
        public readonly ?string $name,
        #[WithTransformer(CurrencyTransformer::class)]
        public ?float $market_cap,
        #[WithTransformer(PercentageTransformer::class, divide: 100)]
        public readonly ?float $market_cap_change_24h,
        public readonly ?string $top_3_coins,
        #[WithTransformer(CurrencyTransformer::class)]
        public ?float $volume_24h
    ) {
    }

    public static function make(Collection $attributes): Collection
    {
        return $attributes->map(
            fn ($item) => self::fromArray(
                attributes: $item
            )
        )->keyBy('id')->sortByDesc('market_cap');
    }

    public static function fromArray(array $attributes): self
    {
        $imgs = data_get($attributes, 'top_3_coins');

        return new self(
            id: (string) (data_get($attributes, 'id')),
            name: (string) (data_get($attributes, 'name')),
            market_cap: data_get($attributes, 'market_cap'),
            market_cap_change_24h: (data_get(
                $attributes,
                'market_cap_change_24h'
            )),
            top_3_coins: $imgs[0] . ' | ' . $imgs[1] . ' | ' . $imgs[2],
            volume_24h: data_get($attributes, 'volume_24h'),
        );
    }
}
