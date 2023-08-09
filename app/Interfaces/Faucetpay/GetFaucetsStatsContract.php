<?php

declare(strict_types=1);

namespace App\Interfaces\Faucetpay;

interface GetFaucetsStatsContract
{
    public function handle(): array;
}
