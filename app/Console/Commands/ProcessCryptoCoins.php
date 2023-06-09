<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCoinsContract;
use Illuminate\Console\Command;

final class ProcessCryptoCoins extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-crypto-coins';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Crypto Coins';

    /**
     * Execute the console command.
     */
    public function handle(
        CryptoActionsInterface $action,
        HandleCoinsContract $handle,
    ): void {
        $action->updateOrCreateCoins(
            action: $handle,
        );
    }
}
