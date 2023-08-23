<?php
/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

/** @noinspection PhpUndefinedMethodInspection */

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
    public static function randColor(
      ?string $colorType = null
    ): \Spatie\Enum\Enum|ColorScheme|string|null {
        if (isset($colorType)) {
            $colors = collect(
              ColorScheme::toValues()
            );

            return self::tryFrom(
              $colors->random()
            )
              ->tw_color();
        }
        $color = collect(
          ColorScheme::toValues()
        )->random();

        return self::tryFrom($color);
    }

    public function tw_color(): string
    {
        return match ($this) {
            ColorScheme::EMERALD() => 'emerald-400',
            ColorScheme::TEAL() => 'teal-400',
            ColorScheme::SLATE() => 'slate-500',
            ColorScheme::DANGER() => 'danger',
            ColorScheme::CYAN() => 'cyan-400',
            ColorScheme::GREEN() => 'green-400',
        };
    }

    protected static function values(): Closure
    {
        return static fn(string $name): string|int => mb_strtolower($name);
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
