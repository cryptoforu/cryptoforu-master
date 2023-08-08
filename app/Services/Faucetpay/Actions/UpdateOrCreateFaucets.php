<?php

namespace App\Services\Faucetpay\Actions;

use App\Interfaces\Faucetpay\ListUpdateOrCreateContract;
use App\Models\FaucetPayList;
use App\Services\Faucetpay\Concerns\ReplaceUrl;
use Illuminate\Support\LazyCollection;

class UpdateOrCreateFaucets implements ListUpdateOrCreateContract
{
  use ReplaceUrl;

  /**
   * @param  LazyCollection  $collection
   * @return void
   */
  public function handle(LazyCollection $collection): void
  {
    $collection->each(function ($item) {
      $item->each(function ($val) {
        FaucetPayList::query()->updateOrCreate(
          [
            'list_name' => $val->list_name
          ],
          [
            'currency' => $val->currency,
            'coin_data' => $val->coin_data,
            'list_data' => $val->list_data
          ]
        );
      });

    });

  }
}
