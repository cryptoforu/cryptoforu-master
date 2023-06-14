<?php

declare(strict_types=1);

namespace App\Enums;

use Closure;
use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('ColorScheme')]
/**
 * @method static self EMERALD()
 * @method static self TEAL()
 * @method static self SLATE()
 * @method static self CYAN()
 * @method static self DANGER()
 * @method static self GREEN()
 */
final class ColorScheme extends Enum
{
    public static function randColor()
    {
        $colors = collect(ColorScheme::toValues());

        return self::tryFrom($colors->random());
    }

    protected static function values(): Closure
    {
        return fn (string $name): string|int => mb_strtolower($name);
    }

    public function color(): string
    {
        return match ($this) {
            ColorScheme::EMERALD() => 'emerald',
            ColorScheme::TEAL() => 'teal',
            ColorScheme::SLATE() => 'slate',
            ColorScheme::DANGER() => 'danger',
            ColorScheme::CYAN() => 'cyan',
            ColorScheme::GREEN() => 'green',
        };
    }
}
