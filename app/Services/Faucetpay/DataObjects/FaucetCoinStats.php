<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Enums\CoinColorsEnum;
use App\Services\Faucetpay\Transformers\CalcualtePercentageTransformer;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

final class FaucetCoinStats extends Data
{
    public function __construct(
        public readonly string $coin,
        public readonly float $sum,
        #[WithTransformer(CalcualtePercentageTransformer::class)]
        public readonly string|array $percentage,
        public readonly string $color
    ) {
    }

    public static function fromCollection(
        Collection $collection
    ): array {
        $total = self::total($collection);

        return [
            'collection' => self::collection(self::sum_coin($collection, $total)),
            'total' => $total,
        ];

    }

    private static function total(Collection $collection)
    {
        return $collection->flatMap(fn ($item) => collect()->mergeRecursive($item['list_data']))->values()->sum(fn ($i) => (float) $i['paid_today']);
    }

    private static function sum_coin(
        Collection $collection,
        float $total
    ): Collection {
        return $collection->map(function ($coin) use ($total) {
            $sum = $coin['list_data']->sum(fn ($i) => (float) $i['paid_today']);

            return self::from([
                'coin' => $coin['currency'],
                'sum' => $sum,
                'percentage' => [
                    'amount' => $sum,
                    'total' => $total,
                ],
                'color' => CoinColorsEnum::tryFrom($coin['currency'])->color(),
            ]);
        })->values();
    }
}
