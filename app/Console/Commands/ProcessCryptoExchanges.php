<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleExchangesInterface;
use Illuminate\Console\Command;

final class ProcessCryptoExchanges extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-crypto-exchanges';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get and Save Crypto Exchanges';

    /**
     * Execute the console command.
     */
    public function handle(
        CryptoActionsInterface $action,
        HandleExchangesInterface $handle,
    ): void {
        $action->updateOrCreateExchanges(
            action: $handle
        );
    }
}
