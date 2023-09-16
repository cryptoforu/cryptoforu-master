<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCoinsContract;
use Illuminate\Console\Command;
use Throwable;

final class ProcessTopCoins extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-top-coins';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(
        CryptoActionsInterface $action,
        HandleCoinsContract $handle,
    ): void {
        try {
            $action->handleTopCoins(
                action: $handle
            );
            $this->info('Dispatched Successfully');
        } catch (Throwable $e) {
            $this->error($e->getMessage());
        }
    }
}
