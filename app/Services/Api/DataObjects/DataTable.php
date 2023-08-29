<?php

declare(strict_types=1);

namespace App\Services\Api\DataObjects;

use App\Enums\CellTypeEnum;
use App\Models\Coin;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Spatie\LaravelData\Data;

final class DataTable extends Data
{
    public function __construct(
        public readonly string $header,
        public readonly string $id,
        public readonly CellTypeEnum|string $cellType,
        public readonly mixed $value
    ) {
    }

    public static function fromFaucets(
        \Illuminate\Support\Collection $faucets
    ): Collection|\Illuminate\Support\Collection {
        return $faucets->map(function ($item) {
            return collect($item)->map(function ($val, $key) use ($item) {
                return new self(
                    Str::headline($key),
                    $key,
                    self::getFaucetsCellType($key),
                    self::getFaucetsValues($key, $val, $item)
                );
            })->only([
                'name', 'paid_today', 'active_users', 'reward',
                'timer_in_minutes', 'health', 'url',
            ]);
        })->values();
    }

    private static function getFaucetsCellType(string $key): string
    {
        if (Str::contains($key, ['paid_today', 'reward'])) {
            return CellTypeEnum::tryFrom('usd_crypto')->faucets();
        }

        return CellTypeEnum::tryFrom($key)?->faucets() ?: '';
    }

    private static function getFaucetsValues(
        string $key,
        string $val,
        mixed $item
    ): array|string {
        return match ($key) {
            'name' => [
                'url' => $item['url'],
                'label' => $item['name'],
            ],
            'paid_today' => [
                'priceUsd' => $item['paid_today'],
                'priceCrypto' => $item['paid_today_coin'],
                'crypto' => $item['currency'],
            ],
            'active_users' => Str::of($item['active_users'])->append('|')->append($item['total_users_paid'])->toString(),
            'reward' => [
                'priceUsd' => $item['reward'],
                'priceCrypto' => $item['reward_coin'],
                'crypto' => $item['currency'],
            ],
            'health' => [
                'meter' => $item['health'],
                'priceUsd' => $item['balance'],
            ],
            'url' => [
                'href' => $item['url'],
                'label' => 'Visit',
                'as' => 'btn',
            ],
            default => $val,
        };
    }

    public static function fromCoins(
        Collection $coins
    ): Collection|\Illuminate\Support\Collection {
        return $coins->map(function (Coin $coin) {
            return collect($coin)->map(function (
                $item,
                $key
            ) use ($coin) {
                return new self(
                    header: self::getCoinHeader($key),
                    id: $key,
                    cellType: self::getCoinCellType($key),
                    value: self::getCoinValue($key, $item, $coin)
                );
            })->except('image')->prepend($coin->id, 'id');
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

            return Str::headline("{$str}(%)");
        }

        return Str::headline($header);
    }

    private static function getCoinCellType(string $coin): string
    {
        if (Str::contains($coin, 'price')) {
            return CellTypeEnum::tryFrom('price')?->coins();
        }

        return CellTypeEnum::tryFrom($coin)?->coins() ?: '';
    }

    private static function getCoinValue(
        string $key,
        mixed $item,
        mixed $value
    ): mixed {
        if (Str::contains($key, 'name')) {
            return [
                'name' => $value->name,
                'image' => $value->image,
            ];
        }

        return $item;
    }
}
