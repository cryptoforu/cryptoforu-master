<?php

namespace App\Interfaces\Faucetpay;

interface GetFaucetsStatsContract
{
  /**
   * @return array
   */
  public function handle(): array;
}
