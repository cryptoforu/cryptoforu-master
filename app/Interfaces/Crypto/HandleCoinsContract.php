<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Illuminate\Support\Collection;

interface HandleCoinsContract
{
  /**
   * HandleAllCoins
   *
   * @param  Collection  $responses
   * @param  string  $data_name
   * @return bool
   */
  public function handle(Collection $responses, string $data_name): bool;
}
