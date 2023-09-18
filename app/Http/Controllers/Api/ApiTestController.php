<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCoinsContract;
use App\Models\Coin;
use App\Services\Crypto\CryptoResource;
use App\Services\Crypto\CryptoService;

final class ApiTestController extends Controller
{
  public function __construct(
    protected CryptoResource $cryptoResource,
    protected CryptoActionsInterface $action,
    protected HandleCoinsContract $handle,
    protected CryptoService $service,
  ) {
  }

  /**
   * Handle the incoming request.
   */
  public function __invoke()
  {
    return Coin::query()->where('category', 'top-coins')->whereIn(
      'name',
      ['Bitcoin', 'Ethereum', 'Cardano', 'BNB', 'XRP', 'Solana']
    )->get();
  }
}
