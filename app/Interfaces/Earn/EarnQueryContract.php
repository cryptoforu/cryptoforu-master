<?php

declare(strict_types=1);

namespace App\Interfaces\Earn;

use Illuminate\Database\Eloquent\Builder;

interface EarnQueryContract
{
    public function handle(Builder $query): Builder;
}
