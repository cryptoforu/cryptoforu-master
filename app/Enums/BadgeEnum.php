<?php
/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

declare(strict_types=1);

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('BadgeEnum')]
/**
 * @method static self POPULAR()
 * @method static self FEATURED()
 * @method static self NEW()
 * @method static self HOT()
 */
final class BadgeEnum extends Enum
{
    public static function randomBadge(): array
    {
        return collect(self::cases())->map(function (BadgeEnum $item) {
            return [
              'label' => $item->label,
              'color' => $item->colors(),
            ];
        })->random();
    }

    public function colors(): string
    {
        return match ($this) {
            self::HOT() => 'danger',
            self::NEW() => 'tw-blue',
            self::FEATURED() => 'cyan-400',
            self::POPULAR() => 'emerald-400'
        };
    }
}
