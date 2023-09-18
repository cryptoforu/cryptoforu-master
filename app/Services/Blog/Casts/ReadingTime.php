<?php

namespace App\Services\Blog\Casts;

use Illuminate\Support\Str;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Casts\Castable;
use Spatie\LaravelData\Support\DataProperty;

final class ReadingTime implements Castable
{

  public function __construct(string $content)
  {
  }

  /**
   * @inheritDoc
   */
  public static function dataCastUsing(...$arguments): Cast
  {
    return new class() implements Cast {
      public function cast(
        DataProperty $property,
        mixed $value,
        array $context
      ): string {
        return Str::of(
          Str::readDuration($context['content']) . ' min read'
        )->toString();
      }
    };
  }
}
