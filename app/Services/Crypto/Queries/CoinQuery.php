<?php

declare(strict_types=1);

namespace App\Services\Crypto\Queries;

use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Models\Crypto;
use Illuminate\Database\Eloquent\Builder;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class CoinQuery implements CoinQueryContract
{
  /**
   * @return Builder
   */
  public function handle(): Builder
  {
    return QueryBuilder::for(
      subject: Crypto::class
    )
      ->allowedFilters([
        AllowedFilter::exact('data_name'),
      ])
      ->allowedFields(['data_name', 'data_values'])
      ->getEloquentBuilder();
  }
}
