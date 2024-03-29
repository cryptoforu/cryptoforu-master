<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Services\Crypto\DataObjects\CryptoCoin;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Request;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

final class FaucetListData extends Data
{
  /**
   * @param  string  $list_name
   * @param  string  $currency
   * @param  CryptoCoin  $coin_data
   * @param  Collection  $list_data
   */
  public function __construct(
    public readonly string $list_name,
    public readonly string $currency,
    public CryptoCoin $coin_data,
    #[DataCollectionOf(FaucetData::class)]
    public Collection $list_data,
  ) {
  }

  public static function fromData(mixed $list): Collection
  {
    return collect([
      'list_name' => $list->list_name,
      'currency' => $list->currency,
      'coin_data' => $list->coin_data,
      'list_data' => $list->list_data->colPaginate(Request::query(
        key: 'page_size',
        default: 50
      ))->appends(Request::query()),
      'updated_at' => Carbon::parse($list->updated_at)->diffForHumans(
        [
          'parts' => '3',
          'join' => true,
        ]
      ),
    ]);
  }
}
