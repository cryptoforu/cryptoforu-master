<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Services\Crypto\DataObjects\CryptoCoin;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;

class FaucetListData extends Data
{
    /**
     * @param  Collection  $list_data
     */
    public function __construct(
        public readonly string $list_name,
        public readonly string $currency,
        public CryptoCoin $coin_data,
        #[DataCollectionOf(FaucetData::class)]
        public Collection $list_data,
    ) {
    }

    public static function fromData(mixed $list): Collection
    {
        return collect([
            'list_name' => $list->list_name,
            'currency' => $list->currency,
            'coin_data' => $list->coin_data,
            'list_data' => $list->list_data->colPaginate(request()->query(
                'page_size',
                100
            ))->appends(request()->query()),
            'updated_at' => Carbon::parse($list->updated_at)->diffForHumans(
                [
                    'parts' => '3',
                    'join' => true,
                ]
            ),
        ]);
    }
}
