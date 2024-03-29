<?php

declare(strict_types=1);

namespace App\Interfaces\Faucetpay;

use Illuminate\Support\LazyCollection;

interface HandleListContract
{
    public function handle(LazyCollection $collection): void;
}
