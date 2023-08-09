<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Services\Faucetpay\Transformers\SatoshiTransformer;
use Carbon\CarbonImmutable;
use DateTime;
use Illuminate\Support\Carbon;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Attributes\WithTransformer;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;

class FaucetData extends Data
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
        public readonly DateTime $creation_date,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $paid_today,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $paid_today_coin,
        public readonly string $total_users_paid,
        public readonly string $active_users,
        #[WithTransformer(SatoshiTransformer::class)]
        public readonly float $balance,
        public readonly string $health,
    ) {
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
        );
    }
}
