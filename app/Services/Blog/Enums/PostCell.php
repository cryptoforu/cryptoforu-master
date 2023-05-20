<?php

declare(strict_types=1);

namespace App\Services\Blog\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('PostCell')]
/**
 * @method static self TITLE()
 * @method static self CATEGORY()
 * @method static self STATUS()
 * @method static self EDIT()
 * @method static self DELETE()
 */
final class PostCell extends Enum
{
}
