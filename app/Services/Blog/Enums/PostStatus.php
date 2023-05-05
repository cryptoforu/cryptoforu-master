<?php

declare (strict_types = 1);

namespace App\Services\Blog\Enums;

// a Laravel specific base class

use Illuminate\Support\Arr;
use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('PostStatus')]
/**
 * @method static self DRAFT()
 * @method static self PREVIEW()
 * @method static self PUBLISHED()
 * @method static self ARCHIVED()
 */
final class PostStatus extends Enum
{
    public function color(): string
    {
        return match ($this) {
            PostStatus::DRAFT() => 'grey',
            PostStatus::PUBLISHED() => 'green',
            PostStatus::PREVIEW() => 'blue',
            PostStatus::ARCHIVED() => 'red',
        };
    }

    public static function options()
    {
        return Arr::map(PostStatus::cases(), function ($value, $key) {
            return
                [
                'name' => $value,
            ];
        });
    }
}
