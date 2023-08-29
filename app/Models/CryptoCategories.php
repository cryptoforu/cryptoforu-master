<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Crypto\Actions\HandleCategories;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\App;
use Sushi\Sushi;

/**
 * App\Models\CryptoCategoriesData
 *
 * @property string|null $id
 * @property string|null $name
 * @property string|null $market_cap
 * @property string|null $market_cap_change_24h
 * @property string|null $top_3_coins
 * @property string|null $volume_24h
 *
 * @method static Builder|CryptoCategories newModelQuery()
 * @method static Builder|CryptoCategories newQuery()
 * @method static Builder|CryptoCategories query()
 * @method static Builder|CryptoCategories whereId($value)
 * @method static Builder|CryptoCategories whereMarketCap($value)
 * @method static Builder|CryptoCategories whereMarketCapChange24h($value)
 * @method static Builder|CryptoCategories whereName($value)
 * @method static Builder|CryptoCategories whereTop3Coins($value)
 * @method static Builder|CryptoCategories whereVolume24h($value)
 */
final class CryptoCategories extends Model
{
    use Sushi;

    public $incrementing = false;

    protected $keyType = 'string';

    public function coins(): HasMany
    {
        return $this->hasMany(Coin::class, 'category', 'id');
    }

    public function getRows(): array
    {
        return $this->getCategories();
    }

    private function getCategories(): array
    {
        $data = App::call(
            fn (
                HandleCategories $categories
            ) => $categories->all()
        );

        return collect($data)->values()->toArray();
    }
}
