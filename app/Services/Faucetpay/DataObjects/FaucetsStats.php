<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Enums\CoinColorsEnum;
use App\Services\Faucetpay\Transformers\CalcualtePercentageTransformer;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;

class FaucetsStats extends Data
{
    public function __construct(
        public readonly string $coin,
        public readonly int $faucets,
        #[WithTransformer(CalcualtePercentageTransformer::class)]
        public readonly string|array $percentage,
        public readonly string $color
    ) {
    }

    public static function fromCollection(
        Collection $collection
    ): array {
        $count = self::total($collection);

        return [
            'collection' => self::collection(self::make($collection, $count)),
            'total' => $count,
        ];
    }

    private static function total(Collection $collection): int
    {
        return $collection->flatMap(fn (
            $item
        ) => collect()->mergeRecursive($item['list_data']))->count();
    }

    private static function make(Collection $collection, float $count)
    {
        return $collection->map(function ($coin) use ($count) {
            $sum = $coin['list_data']->count();
            $coinColor = CoinColorsEnum::tryFrom($coin['currency']);

            return self::from([
                'coin' => $coin['currency'],
                'faucets' => $sum,
                'percentage' => [
                    'amount' => $sum,
                    'total' => $count,
                ],
                'color' => $coinColor?->color(),
            ]);
        })->values();
    }
}
