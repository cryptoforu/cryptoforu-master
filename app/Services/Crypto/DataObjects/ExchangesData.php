<?php

declare(strict_types=1);

namespace App\Services\Crypto\DataObjects;

use App\Services\Crypto\Transformers\CurrencyTransformer;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

final class ExchangesData extends Data
{
    public function __construct(
        public readonly ?string $id,
        public readonly ?string $name,
        public readonly ?int $year_established,
        public readonly ?string $url,
        public readonly ?string $image,
        public readonly ?int $trust_score,
        public readonly ?int $trust_score_rank,
        #[WithTransformer(CurrencyTransformer::class, currency: 'BTC')]
        public readonly ?float $trade_volume_24h_btc
    ) {
    }

    public static function fromArray(array $exchanges): self
    {
        return new self(
            id: (string) (data_get($exchanges, 'id')),
            name: (string) (data_get($exchanges, 'name')),
            year_established: (int) (data_get($exchanges, 'year_established')),
            url: (string) data_get($exchanges, 'url'),
            image: (string) (data_get($exchanges, 'image')),
            trust_score: (int) (data_get($exchanges, 'trust_score')),
            trust_score_rank: (int) (data_get($exchanges, 'trust_score_rank')),
            trade_volume_24h_btc: (float) (data_get($exchanges, 'trade_volume_24h_btc'))
        );
    }

    public static function make(Collection $collection): Collection
    {

        return $collection->map(
            fn ($item) => self::fromArray(
                exchanges: $item
            )
        );
    }
}
