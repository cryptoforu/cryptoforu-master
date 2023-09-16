<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataFactory;

use App\Models\Coin;
use App\Models\Site;
use App\Services\Faucetpay\Concerns\ReplaceUrl;
use App\Services\Faucetpay\Concerns\Sortable;
use App\Services\Faucetpay\DataObjects\FaucetData;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\LazyCollection;

final class FaucetDataFactory
{
    use ReplaceUrl;
    use Sortable;

    public function collection(Collection $collection): LazyCollection
    {
        return $collection->lazy()->map(function ($item, $key) {
            return $this->faucets(
                collection: $item,
                price: 'TOP' === $key ? $this->faucet_coins()['BTC']->current_price : $this->faucet_coins()[$key]->current_price
            );
        });
    }

    private function faucets($collection, float $price): Collection
    {
        $arr = Arr::map(
            $collection,
            static function (array $value) use ($price) {
                return FaucetData::fromArray([
                    ...$value,
                    'reward_coin' => (float) $value['reward'] / $price,
                    'paid_today_coin' => (float) $value['paid_today'] / $price,
                    'listCategory' => $value['currency'],
                ]);
            }
        );

        return $this->make($arr);
    }

    private function make($list): Collection
    {
        $fp_wallets = Site::ofData('fp_wallets')->data_values;
        $fp_refs = Site::ofData('fp_ref_urls')->data_values;

        return $this->replaceUrl(
            faucets: $list,
            wallets: $fp_wallets,
            refs: $fp_refs
        );
    }

    private function faucet_coins(): Collection
    {
        return Coin::query()
            ->where('category', 'fp_coins')
            ->get()->keyBy('symbol');
    }
}
