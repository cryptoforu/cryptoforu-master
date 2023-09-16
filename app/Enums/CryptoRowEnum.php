<?php

/** @noinspection PhpUndefinedMethodInspection */

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('CellType')]
/**
 * @method static self name()
 * @method static self price()
 * @method static self current_price()
 */
final class CryptoRowEnum extends Enum
{
  public function cell(): string
  {
    return match ($this) {
      self::name() => 'image',
      self::current_price() => 'price',
      self::price() => 'price'
    };
  }
}
