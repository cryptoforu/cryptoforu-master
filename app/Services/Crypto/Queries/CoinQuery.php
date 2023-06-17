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
            subject: Crypto::class
        )
            ->allowedFilters([
                AllowedFilter::exact('data_name'),
                'data_values',
            ])
            ->allowedFields(['data_name', 'data_values'])
            ->value('data_values')
        ;
    }
}
