<?php

declare(strict_types=1);

namespace App\Services\Crypto\DataObjects;

use App\Models\Coin;
use App\Services\Api\DataObjects\ColumnsData;
use App\Services\Crypto\Transformers\ColorTransformer;
use App\Services\Crypto\Transformers\CurrencyCast;
use App\Services\Crypto\Transformers\CurrencyTransformer;
use App\Services\Crypto\Transformers\IdTransformer;
use App\Services\Crypto\Transformers\PercentageTransformer;
use App\Services\Crypto\Transformers\ToUpperTransformer;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Illuminate\Support\Stringable;
use Spatie\LaravelData\Attributes\WithCastable;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CryptoCoin')]
final class CryptoCoin extends Data
{
  public function __construct(
    #[WithTransformer(IdTransformer::class, replace: ['binancecoin' => 'binance coin'])]
    public string $id,
    public string $name,
    public string $image,
    #[WithCastable(CurrencyCast::class)]
    public string $current_price,
    #[WithCastable(CurrencyCast::class)]
    public float|string $market_cap,
    public ?int $market_cap_rank,
    #[WithTransformer(CurrencyTransformer::class)]
    public ?string $total_volume,
    #[WithTransformer(CurrencyTransformer::class)]
    public ?string $high_24h,
    #[WithTransformer(CurrencyTransformer::class)]
    public ?string $low_24h,
    #[WithTransformer(CurrencyTransformer::class)]
    public ?string $price_change_24h,
    #[WithTransformer(PercentageTransformer::class, min: 4, max: 4)]
    public ?string $price_change_percentage_24h,
    #[WithTransformer(PercentageTransformer::class)]
    public ?string $price_change_percentage_1h_in_currency,
    #[WithTransformer(PercentageTransformer::class)]
    public ?string $price_change_percentage_24h_in_currency,
    #[WithTransformer(PercentageTransformer::class)]
    public ?string $price_change_percentage_7d_in_currency,
    #[WithTransformer(ToUpperTransformer::class)]
    public string $symbol,
    #[WithTransformer(ColorTransformer::class)]
    public readonly ?float $color,
  ) {
  }

  public static function transform_id(string $id, array $replace): string
  {
    $replaced = '';
    foreach ($replace as $key => $value) {
      $replaced = Str::of($id)
        ->whenContains(
          $key,
          fn(Stringable $string) => $string->replace(
            $id,
            $value
          )->slug()
        );
    }

    return (string) $replaced;
  }

  public static function make(Builder|Relation $attributes): array
  {
    $collection = collect(
      value: $attributes->fastJson()->appends(request()->query())
    );

    return [
      'columns' => self::columns(),
      'coinsData' => $collection->pull('data'),
      'links' => $collection->pull('links'),
      'meta' => $collection->all(),
    ];
  }

  private static function columns()
  {
    return Cache::rememberForever('crypto-columns', function () {
      $first = Coin::columns();

      return ColumnsData::fromCoins(coin: $first)->except('image')->toArray();

    });
  }
}
