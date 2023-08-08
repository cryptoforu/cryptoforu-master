<?php

namespace App\Console\Commands;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCoinsContract;
use Illuminate\Console\Command;

class ProcessFpCoins extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:process-fp-coins';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Process Faucetpay Coin Data';

  /**
   * Execute the console command.
   */
  public function handle(
    CryptoActionsInterface $action,
    HandleCoinsContract $handle,
  ) {
    $action->updateOrCreateFpCoins(
      action: $handle
    );
  }
}
