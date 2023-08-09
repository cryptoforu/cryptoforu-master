<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Actions;

use App\Interfaces\Faucetpay\GetFaucetsStatsContract;
use App\Models\FaucetPayList;
use App\Services\Faucetpay\DataObjects\FaucetCoinStats;
use App\Services\Faucetpay\DataObjects\FaucetListStats;
use App\Services\Faucetpay\DataObjects\FaucetsStats;

final class GetFaucetsStats implements GetFaucetsStatsContract
{
    public function handle(): array
    {
        $query = FaucetPayList::query()
            ->whereNotIn('currency', ['top_hundred', 'new_faucets'])
            ->get()
        ;
        $coinStats = FaucetCoinStats::fromCollection($query);
        $faucetsStats = FaucetsStats::fromCollection($query);

        return FaucetListStats::from([
            'coinStats' => $coinStats['collection'],
            'faucetsStats' => $faucetsStats['collection'],
            'totalCoin' => $coinStats['total'],
            'totalFaucets' => $faucetsStats['total'],
        ])->toArray();
    }
}
