<?php /** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */
/** @noinspection PhpUndefinedMethodInspection */

declare(strict_types=1);

namespace App\Services\Blog\Enums;

use Illuminate\Support\Arr;
use Spatie\Enum\Laravel\Enum;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('PostStatus')]
/**
 * @method static self DRAFT()
 * @method static self PREVIEW()
 * @method static self PUBLISHED()
 * @method static self ARCHIVED()
 * @method static self FEATURED()
 */
final class PostStatus extends Enum
{
  public static function options(): array
  {
    return Arr::map(self::cases(), static function ($value) {
      return
        [
          'name' => $value,
        ];
    });
  }

  public function color(): string
  {
    return match ($this) {
      PostStatus::DRAFT() => 'grey',
      PostStatus::PUBLISHED() => 'green',
      PostStatus::PREVIEW() => 'blue',
      PostStatus::ARCHIVED() => 'red',
      PostStatus::FEATURED() => 'teal'
    };
  }

  public function tw_color(): string
  {
    return match ($this) {
      self::DRAFT() => 'slate-500',
      self::FEATURED() => 'emerald-400',
      self::PUBLISHED() => 'cyan-400',
      self::PREVIEW() => 'teal-400',
    };
  }
}
