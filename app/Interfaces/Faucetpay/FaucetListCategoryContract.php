<?php

declare(strict_types=1);

namespace App\Interfaces\Faucetpay;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

interface FaucetListCategoryContract
{
    public function handle(Builder|Model $query): Builder;
}
