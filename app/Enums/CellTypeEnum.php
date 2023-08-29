<?php

/** @noinspection PhpUndefinedMethodInspection */

declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CellType')]
/**
 * @method static self url()
 * @method static self usd_crypto()
 * @method static self timer_in_minutes()
 * @method static self health()
 * @method static self name()
 * @method static self price()
 * @method static self current_price()
 */
final class CellTypeEnum extends Enum
{
    public function coins(): string
    {
        return match ($this) {
            self::name() => 'image',
            self::current_price() => 'price',
            self::price() => 'price'
        };
    }

    public function faucets(): string
    {
        return match ($this) {
            self::name() => 'link',
            self::usd_crypto() => 'usd_crypto',
            self::timer_in_minutes() => 'time',
            self::health() => 'meter',
            self::url() => 'link'
        };
    }
}
