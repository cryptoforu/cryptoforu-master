<?php

namespace App\Console\Commands;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCoinsContract;
use Illuminate\Console\Command;
use Throwable;

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
    protected $description = 'Process FaucetPay Coins';

    /**
     * Execute the console command.
     */
    public function handle(
        CryptoActionsInterface $action,
        HandleCoinsContract $handle,
    ): void {
        try {
            $action->fp_coins(
                action: $handle
            );
            $this->info('Updated Succesfully');
        } catch (Throwable $e) {
            $this->error($e->getMessage());
        }
    }
}
