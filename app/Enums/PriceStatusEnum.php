<?php

declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self POSITIVE()
 * @method static self NEGATIVE()
 */
final class PriceStatusEnum extends Enum
{
    public function status(): string
    {
        return match ($this) {
            PriceStatusEnum::POSITIVE() => 'green.500',
            PriceStatusEnum::NEGATIVE() => 'red.500',
        };
    }
}
