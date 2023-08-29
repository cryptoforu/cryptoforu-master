<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Crypto\Actions\HandleAllCoins;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Sushi\Sushi;

/**
 * App\Models\Coin
 *
 * @property string|null $category
 * @property string|null $id
 * @property string|null $name
 * @property string|null $image
 * @property float|null $current_price
 * @property string|null $market_cap
 * @property int|null $market_cap_rank
 * @property int|null $total_volume
 * @property string|null $high_24h
 * @property string|null $low_24h
 * @property string|null $price_change_24h
 * @property string|null $price_change_percentage_24h
 * @property string|null $price_change_percentage_1h_in_currency
 * @property string|null $price_change_percentage_24h_in_currency
 * @property string|null $price_change_percentage_7d_in_currency
 * @property string|null $symbol
 * @property string|null $color
 *
 * @method static Builder|Coin newModelQuery()
 * @method static Builder|Coin newQuery()
 * @method static Builder|Coin query()
 * @method static Builder|Coin whereCategory($value)
 * @method static Builder|Coin whereColor($value)
 * @method static Builder|Coin whereCurrentPrice($value)
 * @method static Builder|Coin whereHigh24h($value)
 * @method static Builder|Coin whereId($value)
 * @method static Builder|Coin whereImage($value)
 * @method static Builder|Coin whereLow24h($value)
 * @method static Builder|Coin whereMarketCap($value)
 * @method static Builder|Coin whereMarketCapRank($value)
 * @method static Builder|Coin whereName($value)
 * @method static Builder|Coin wherePriceChange24h($value)
 * @method static Builder|Coin wherePriceChangePercentage1hInCurrency($value)
 * @method static Builder|Coin wherePriceChangePercentage24h($value)
 * @method static Builder|Coin wherePriceChangePercentage24hInCurrency($value)
 * @method static Builder|Coin wherePriceChangePercentage7dInCurrency($value)
 * @method static Builder|Coin whereSymbol($value)
 * @method static Builder|Coin whereTotalVolume($value)
 */
final class Coin extends Model
{
    use Sushi;

    public $incrementing = false;

    protected $keyType = 'string';

    protected array $schema = [
        'category' => 'string',
        'id' => 'string',
        'name' => 'string',
        'image' => 'string',
        'color' => 'string',
        'symbol' => 'string',
        'current_price' => 'float',
        'market_cap' => 'string',
        'market_cap_rank' => 'integer',
        'total_volume' => 'integer',
        'low_24h' => 'string',
        'high_24h' => 'string',
        'price_change_24h' => 'string',
        'price_change_percentage_24h' => 'string',
        'price_change_percentage_1h_in_currency' => 'string',
        'price_change_percentage_7d_in_currency' => 'string',
        'price_change_percentage_24h_in_currency' => 'string',

    ];

    public function coin_category(
    ): BelongsTo {
        return $this->belongsTo(CryptoCategories::class, 'id', 'category');
    }

    public function getRows(): array
    {
        return $this->fetchModels()->toArray();
    }

    public function fetchModels(): Collection
    {
        $data = App::call(fn (HandleAllCoins $allCoins) => $allCoins->all());

        return collect($data)->map(function ($item, $key) {
            return collect($item)->map(fn ($coin) => [
                'category' => $key, ...$coin,
            ])->values();
        })->collapse();
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'symbol';
    }

    protected function sushiShouldCache(): true
    {
        return true;
    }

    protected function sushiCacheReferencePath(): string
    {
        return storage_path('app/crypto/coins.json');
    }
}
