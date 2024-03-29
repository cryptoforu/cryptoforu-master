<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Services\Crypto\Transformers\CurrencyTransformer;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;

final class FaucetListStats extends Data
{
    public function __construct(
        #[DataCollectionOf(FaucetCoinStats::class)]
        public DataCollection $coinStats,
        #[DataCollectionOf(FaucetsStats::class)]
        public DataCollection $faucetsStats,
        #[WithTransformer(CurrencyTransformer::class)]
        public readonly float $totalCoin,
        public readonly int $totalFaucets,
    ) {
    }
}
