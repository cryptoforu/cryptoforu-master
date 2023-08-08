<?php

namespace App\Console\Commands;

use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Faucetpay\ListUpdateOrCreateContract;
use Illuminate\Console\Command;

class UpdateFaucetList extends Command
{
  /**
   * The name and signature of the console command.
   *
   * @var string
   */
  protected $signature = 'app:update-faucet-list';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = 'Update FaucetPay List';

  /**
   * Execute the console command.
   */
  public function handle(
    FaucetPayServiceInterface $service,
    ListUpdateOrCreateContract $list,
  ): void {
    $newList = $service->list()->make_list();
    $list->handle(
      collection: $newList
    );
  }
}
