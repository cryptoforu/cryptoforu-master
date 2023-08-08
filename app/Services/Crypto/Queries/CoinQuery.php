<?php

declare(strict_types=1);

namespace App\Services\Crypto\Queries;

use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Models\Crypto;
use Illuminate\Support\Collection;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CoinQuery implements CoinQueryContract
{
    public function handle(): Collection
    {
        return QueryBuilder::for(
            subject: Crypto::query()->value('data')
        )
            ->allowedFilters([
                AllowedFilter::exact('data_name'),
                AllowedFilter::exact('coins.id'),
            ])
            ->value('data_values')
        ;
    }
}
