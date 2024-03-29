<?php

declare(strict_types=1);

namespace App\Services\Settings\Concerns;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;

trait TransformKeys
{
  /**
   * Transform Keys or Items Values from Array or Collection
   */
  public function transform(
    array|Collection $values,
    $str,
    Str|string $callback = 'headline',
    string $type = 'key'
  ): array|Collection {
    if (is_array($values)) {
      return collect(
        value: $values
      )->transform(function (int|string $item, int|string $key) use (
        $type,
        $callback,
      ) {
        $str = new Str();
        $key = $str->{$callback}('key' === $type ? $key : $item);

        return collect([$key => $item]);
      })->collapse()->all();
    }

    return $values->transform(
      function (int|string $item, int|string $key) use (
        $type,
        $callback,
        $str
      ) {
        $key = $str->{$callback}('key' === $type ? $key : $item);

        return collect([$key => $item]);
      }
    )->collapse()->all();
  }
}
