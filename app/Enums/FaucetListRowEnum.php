<?php

/** @noinspection PhpUndefinedMethodInspection */

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('FaucetListRow')]
/**
 * @method static self name()
 * @method static self paid_today()
 * @method static self active_users()
 * @method static self reward()
 * @method static self timer_in_minutes()
 * @method static self health()
 * @method static self url()
 */
final class FaucetListRowEnum extends Enum
{
    public function rows(): array|string|object
    {
        return match ($this) {
            self::name() => ['url', 'name'],
            self::paid_today() => ['paid_today', 'paid_today_coin', 'currency'],
            self::active_users() => ['active_users', 'total_users_paid'],
            self::reward() => ['reward', 'reward_coin', 'currency'],
            self::timer_in_minutes() => 'timer_in_minutes',
            self::health() => ['health', 'balance'],
            self::url() => 'url'
        };
    }

    public function cell(): string
    {
        return match ($this) {
            self::name() => 'name',
            self::paid_today() => 'usd_crypto',
            self::active_users() => 'default',
            self::reward() => 'usd_crypto',
            self::timer_in_minutes() => 'time',
            self::health() => 'meter',
            self::url() => 'link'
        };
    }
}
