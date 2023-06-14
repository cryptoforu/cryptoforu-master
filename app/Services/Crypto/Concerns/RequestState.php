<?php

declare(strict_types=1);

namespace App\Services\Crypto\Concerns;

trait RequestState
{
  /**
   * @param  int  $from
   * @param  int  $to
   * @param  string  $key
   * @param  int|null  $by
   * @param  int|null  $max
   * @return void
   */
  public function set_state(
    int $from,
    int $to,
    string $key,
    ?int $by = 3,
    ?int $max = 9
  ): void {
    if ($max === $to) {
      settings()->put($key, ['from' => 1, 'to' => 3]);
    } else {
      settings()->put(
        $key,
        [
          'from' => $from + $by,
          'to' => $to + $by,
        ]
      );
    }

  }
}
