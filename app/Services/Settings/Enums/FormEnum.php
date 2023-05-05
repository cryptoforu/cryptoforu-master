<?php

declare(strict_types=1);

namespace App\Services\Settings\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('FormType')]
/**
 * @method static self textfield()
 * @method static self textarea()
 * @method static self select()
 * @method static self file()
 * @method static self checkbox()
 * @method static self md()
 * @method static self switch()
 * @method static self tags()
 */
final class FormEnum extends Enum
{
}
