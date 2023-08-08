<?php

declare(strict_types=1);

namespace App\Interfaces\Faucetpay;

use App\Services\Faucetpay\FaucetPayListResource;

interface FaucetPayServiceInterface
{
  public function list(): FaucetPayListResource;
}
