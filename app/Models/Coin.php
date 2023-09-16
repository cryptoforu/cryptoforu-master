<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Crypto\DataObjects\CryptoCoin;
use Cerbero\JsonParser\JsonParser;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Cache;
use Laravel\Scout\Searchable;
use Spatie\LaravelData\WithData;
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
 * @method static Builder|Coin ofPriceChange(string $direction = 'asc', int $limit = 3)
 * @method static Builder|Coin columns()
 */
final class Coin extends Model
{
    use Searchable;
    use Sushi;
    use WithData;

    public $incrementing = false;

    protected string $dataClass = CryptoCoin::class;

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

    public function coin_category(): BelongsTo
    {
        return $this->belongsTo(CryptoCategories::class, 'id', 'category');
    }

    public function getRows(): array
    {
        return $this->fetchModels();
    }

    public function fetchModels(): array
    {

        return Cache::remember(
            'crypto_coins',
            now()->addHour(),
            function () {
                return Arr::collapse(
                    array: JsonParser::parse(
                        storage_path('app/crypto/coins.json')
                    )->toArray()
                );
            }
        );
    }

    public function scopeColumns(Builder $query): null|Builder|Model
    {
        return $query->first(
            [
                'name', 'image', 'current_price',
                'price_change_percentage_24h',
                'price_change_percentage_1h_in_currency',
                'price_change_percentage_24h_in_currency',
                'price_change_percentage_7d_in_currency', 'market_cap']
        );
    }

    public function scopeOfPriceChange(Builder $query, string $direction = 'asc', int $limit = 3): Builder
    {
        return $query->orderBy(
            'price_change_percentage_24h',
            $direction
        )->take($limit);
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'symbol';
    }

    public function toSearchableArray(): array
    {
        return [
            'name' => $this->name,
            'symbol' => (float) $this->symbol,
            'category' => $this->category,
        ];
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
