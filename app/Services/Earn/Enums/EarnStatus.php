<?php

declare(strict_types=1);

namespace App\Services\Earn\Enums;

use Illuminate\Support\Arr;
use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('EarnStatus')]
/**
 * @method static self DRAFT()
 * @method static self FEATURED()
 * @method static self PUBLISHED()
 */
final class EarnStatus extends Enum
{
    public static function options()
    {
        return Arr::map(EarnStatus::cases(), function ($value, $key) {
            return
                [
                    'name' => $value,
                ];
        });
    }
}
