<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use Sushi\Sushi;

final class Coin extends Model
{
    use Sushi;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $schema = [
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
      'price_change_percentage_24h_in_currency' => 'string'

    ];

    public function getRows(): array
    {
        $data = $this->fetchModels();
        $collection = collect();
        foreach ($data as $v) {
            $collection->push(...$v);
        }
        return $collection->toArray();
    }

    public function fetchModels()
    {
        return Cache::rememberForever('crypto_sushi', function () {
            return Crypto::query()->whereNotIn('data_name',
              ['categories', 'exchanges'])->get()->map(function ($item) {
                $col = collect(['category' => data_get($item, 'data_name')]);
                return $item->data_values->map(function ($val) use ($col) {
                    return $col->merge($val);
                });
            });
        });
    }

    protected function sushiShouldCache(): true
    {
        return true;
    }
}