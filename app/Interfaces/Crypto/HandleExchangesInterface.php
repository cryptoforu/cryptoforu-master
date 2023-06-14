<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Illuminate\Support\Collection;

interface HandleExchangesInterface
{
  /**
   * @param  Collection  $responses
   * @return bool
   */
  public function handle(Collection $responses): bool;
}
