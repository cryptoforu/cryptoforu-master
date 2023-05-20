<?php

namespace App\Services\Earn\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('FeaturedEarn')]
/**
 * @method static self FEATURED()
 * @method static self NOTFEATURED()
 */
final class FeaturedEnum extends Enum
{
    protected static function values(): array
    {
        return [
            'FEATURED' => 1,
            'NOTFEATURED' => 2,
        ];
    }
}
