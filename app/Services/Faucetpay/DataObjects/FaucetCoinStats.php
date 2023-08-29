<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Models\FaucetList;
use App\Models\FaucetListCategory;
use App\Services\Faucetpay\Transformers\CalcualtePercentageTransformer;
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

    public static function make(): array
    {
        $count = collect();
        $data = FaucetListCategory::query()->with('list')->get();
        $total = FaucetList::query()->sum('paid_today');
        $data->map(function ($item) use ($count, $total): void {
            $count->push([
                'coin' => $item->symbol,
                'sum' => collect($item->list)->sum(fn (
                    $i
                ) => (float) $i['paid_today']),
                'percentage' => [
                    'amount' => collect($item->list)->sum(fn (
                        $i
                    ) => (float) $i['paid_today']),
                    'total' => $total,
                ],
                'color' => $item->color,
            ]);
        });

        return [
            'collection' => self::collection($count),
            'total' => $total,
        ];
    }
}
