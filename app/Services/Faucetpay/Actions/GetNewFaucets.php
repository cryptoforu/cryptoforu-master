<?php

namespace App\Services\Faucetpay\Actions;

use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class GetNewFaucets
{
  /**
   * @param  Collection  $collection
   * @return array
   */
  public function __invoke(Collection $collection): Collection
  {

    return $collection->flatMap(function ($item) {
      return collect()->mergeRecursive($item['list_data']);
    })->filter(function ($item) {
      $beforeTime = Carbon::now('Europe/Sarajevo')->subMonths(1);
      $dt = Carbon::parse($item['creation_date'], 'Europe/Sarajevo');
      $compare = Carbon::parse($beforeTime);
      return $dt->greaterThanOrEqualTo($compare);
    })->values();
  }
}
