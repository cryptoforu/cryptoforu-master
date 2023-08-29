<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Actions;

use App\Interfaces\Faucetpay\GetFaucetsStatsContract;
use App\Models\FaucetList;
use App\Services\Faucetpay\DataObjects\FaucetCoinStats;
use App\Services\Faucetpay\DataObjects\FaucetListStats;
use App\Services\Faucetpay\DataObjects\FaucetsStats;

final class GetFaucetsStats implements GetFaucetsStatsContract
{
    public function handle(): array
    {
        $query = FaucetList::query()->get();
        $coinStats = FaucetCoinStats::make();
        $faucetsStats = FaucetsStats::make();

        return FaucetListStats::from(
            [
                'coinStats' => $coinStats['collection'],
                'faucetsStats' => $faucetsStats['collection'],
                'totalCoin' => $coinStats['total'],
                'totalFaucets' => $faucetsStats['total'],
            ]
        )->toArray();
    }
}
