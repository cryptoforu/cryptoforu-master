<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto\Contracts;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

interface CoinQueryContract
{
    public function handle(Builder|Model $query): Builder;
}
