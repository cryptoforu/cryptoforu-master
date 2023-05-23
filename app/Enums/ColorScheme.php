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
 * @method static self CYAN()
 * @method static self BLUE()
 * @method static self RED()
 */
final class ColorScheme extends Enum
{
    public function color(): string
    {
        return match ($this) {
            ColorScheme::EMERALD() => 'emerald',
            ColorScheme::TEAL() => 'teal',
            ColorScheme::BLUE() => 'blue',
            ColorScheme::RED() => 'red',
            ColorScheme::CYAN() => 'cyan',
        };
    }

    protected static function values(): Closure
    {
        return fn (string $name): string|int => mb_strtolower($name);
    }

    public static function randColor()
    {
        $colors = collect(ColorScheme::toValues());

        return self::tryFrom($colors->random());
    }
}
