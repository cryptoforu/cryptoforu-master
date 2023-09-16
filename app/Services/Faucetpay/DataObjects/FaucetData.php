<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Models\FaucetList;
use App\Services\Api\DataObjects\ColumnsData;
use App\Services\Faucetpay\Transformers\SatoshiTransformer;
use Carbon\CarbonImmutable;
use DateTime;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Request;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;

final class FaucetData extends Data
{
    public function __construct(
        public readonly string $name,
        public string $url,
        public readonly string $currency,
        public readonly string $timer_in_minutes,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $reward,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $reward_coin,
        #[WithCast(DateTimeInterfaceCast::class, type: CarbonImmutable::class, timeZone: 'Europe/Sarajevo')]
        public readonly DateTime|Carbon $creation_date,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $paid_today,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $paid_today_coin,
        public readonly string $total_users_paid,
        public readonly string $active_users,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $balance,
        public readonly string $health,
        public readonly string $listCategory
    ) {
    }

    public static function fromModel(FaucetList $list): FaucetData
    {
        return new self(
            name: $list->name,
            url: $list->url,
            currency: $list->currency,
            timer_in_minutes: (string) $list->timer_in_minutes,
            reward: (float) $list->reward,
            reward_coin: (float) $list->reward_coin,
            creation_date: Carbon::parse($list->creation_date),
            paid_today: (float) $list->paid_today,
            paid_today_coin: (float) $list->paid_today_coin,
            total_users_paid: (string) $list->total_users_paid,
            active_users: (string) $list->active_users,
            balance: (float) $list->balance,
            health: (string) $list->health,
            listCategory: (string) $list->listCategory
        );
    }

    public static function fromArray(array $attributes): self
    {
        return new self(
            name: data_get($attributes, 'name'),
            url: data_get($attributes, 'url'),
            currency: data_get($attributes, 'currency'),
            timer_in_minutes: data_get($attributes, 'timer_in_minutes'),
            reward: (float) data_get($attributes, 'reward'),
            reward_coin: (float) data_get($attributes, 'reward_coin'),
            creation_date: Carbon::createFromTimestamp(data_get(
                $attributes,
                'creation_date'
            )),
            paid_today: (float) data_get($attributes, 'paid_today'),
            paid_today_coin: (float) data_get($attributes, 'paid_today_coin'),
            total_users_paid: data_get($attributes, 'total_users_paid'),
            active_users: data_get($attributes, 'active_users'),
            balance: (float) data_get($attributes, 'balance'),
            health: data_get($attributes, 'health'),
            listCategory: (string) data_get($attributes, 'listCategory')
        );
    }

    public static function make(mixed $data): array
    {
        $list = self::collection(
            items: $data->fastJson()->appends(Request::query())
        )->toArray();
        $cols = FaucetList::columns();

        return [
            'columns' => ColumnsData::fromFaucets($cols)->values(),
            'listData' => data_get($list, 'data'),
            'links' => data_get($list, 'links'),
            'meta' => data_get($list, 'meta'),
        ];
    }
}
