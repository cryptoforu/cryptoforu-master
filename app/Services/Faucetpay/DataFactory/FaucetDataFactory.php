<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataFactory;

use App\Models\Crypto;
use App\Models\FaucetPayList;
use App\Models\Site;
use App\Services\Crypto\DataObjects\CryptoCoin;
use App\Services\Faucetpay\Actions\GetNewFaucets;
use App\Services\Faucetpay\Concerns\ReplaceUrl;
use App\Services\Faucetpay\Concerns\Sortable;
use App\Services\Faucetpay\DataObjects\FaucetData;
use App\Services\Faucetpay\DataObjects\FaucetListData;
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
            $list_data = $this->faucets(
                collection: $item,
                price: $this->faucet_coins()[$key]->current_price
            );
            $top = $this->top($list_data);
            $new = new Collection(
                FaucetPayList::all()
                    ->pipeThrough(
                        [new GetNewFaucets()]
                    )
            );
            $coins = $this->generate(
                name: $key,
                currency: $key,
                key: $key,
                list: $list_data
            );
            $top_hundred = $this->generate(
                name: 'Top Hundred',
                currency: 'top_hundred',
                key: 'BTC',
                list: $top
            );
            $new_faucets = $this->generate(
                name: 'New Faucets',
                currency: 'new_faucets',
                key: 'MATIC',
                list: $new
            );

            return FaucetListData::collection([$coins, $top_hundred, $new_faucets]);
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
        $query = Crypto::ofName('fp_coins');

        return (
        new Collection(
            $query->data_values
        )
        )->map(
            fn ($item) => CryptoCoin::from($item)
        );
    }

    private function top(Collection $list)
    {
        return $this->sortArray(
            attributes: $list
        )->unique('name', true)->take(100)->values();
    }

    private function generate(
        string $name,
        string $currency,
        string $key,
        Collection $list
    ): FaucetListData {
        return new FaucetListData(
            $name,
            $currency,
            $this->faucet_coins()[$key],
            $list
        );
    }
}
