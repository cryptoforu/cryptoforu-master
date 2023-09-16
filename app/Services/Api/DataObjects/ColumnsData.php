<?php

declare(strict_types=1);

namespace App\Services\Api\DataObjects;

use App\Enums\CryptoRowEnum;
use App\Enums\FaucetListRowEnum;
use App\Models\Coin;
use App\Models\FaucetList;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Spatie\LaravelData\Data;

final class ColumnsData extends Data
{
  public function __construct(
    public readonly string $header,
    public readonly string $id,
    public readonly FaucetListRowEnum|CryptoRowEnum|string $cellType,
    public readonly string|array|object $original
  ) {
  }

  /**
   * Make Table Columns Data From Faucets
   */
  public static function fromFaucets(FaucetList $list): Collection
  {
    return collect($list)->map(function ($item, $key) {
      return new self(
        header: Str::headline($key),
        id: $key,
        cellType: FaucetListRowEnum::tryFrom($key)->cell(),
        original: FaucetListRowEnum::tryFrom($key)->rows()
      );
    });
  }

  /**
   * Make Columns Data From Coins
   */
  public static function fromCoins(Coin $coin): Collection
  {
    return collect($coin)->map(function ($item, $key) {
      return new self(
        header: self::getCoinHeader($key),
        id: $key,
        cellType: self::getCoinCellType($key),
        original: self::getCoinValue($key),
      );
    });
  }

  private static function getCoinHeader(string $header): string
  {
    if (Str::contains($header, 'percentage')) {
      $str = Str::between(
        $header,
        'price_change_percentage_',
        '_in_currency'
      );

      return Str::headline("$str(%)");
    }

    return Str::headline($header);
  }

  private static function getCoinCellType(string $coin): string
  {
    if (Str::contains($coin, 'price')) {
      return CryptoRowEnum::tryFrom('price')?->cell();
    }

    return CryptoRowEnum::tryFrom($coin)?->cell() ?: '';
  }

  private static function getCoinValue(
    string $key,
  ): string|array {
    if (Str::contains($key, 'name')) {
      return [
        'image', 'name',
      ];
    }

    return $key;
  }
}
