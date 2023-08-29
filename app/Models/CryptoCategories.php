<?php

declare(strict_types=1);

namespace App\Models;

use App\Services\Crypto\Actions\HandleCategories;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Sushi\Sushi;

/**
 * App\Models\CryptoCategories
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

    public function getRows(): array
    {
        return $this->getCategories();
    }

    private function getCategories()
    {
        $data = App::call(fn (HandleCategories $categories) => $categories->all());

        return collect($data)->map(function ($item) {
            return [
                'id' => data_get($item, 'id'),
                'name' => data_get($item, 'name'),
                'market_cap' => data_get($item, 'market_cap'),
                'market_cap_change_24h' => data_get(
                    $item,
                    'market_cap_change_24h'
                ),
                'top_3_coins' => $item['top_3_coins'][0] . ' | ' . $item['top_3_coins'][1] . ' | ' . $item['top_3_coins'][2],
                'volume_24h' => data_get($item, 'volume_24h'),
            ];
        })->values()->toArray();
    }

    protected function sushiShouldCache(): true
    {
        return true;
    }

    protected function sushiCacheReferencePath(): string
    {
        return storage_path('app/crypto/categories.json');
    }
}
