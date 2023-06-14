<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface CoinQueryContract
{
    public function handle(): Builder;
}
