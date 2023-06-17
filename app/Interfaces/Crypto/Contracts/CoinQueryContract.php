<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto\Contracts;

use Illuminate\Support\Collection;

interface CoinQueryContract
{
    public function handle(): Collection;
}
