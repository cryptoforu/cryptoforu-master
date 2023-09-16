<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCoinsContract;
use Illuminate\Console\Command;
use Throwable;

final class ProcessCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:process-categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crypto Coins by Category';

    /**
     * Execute the console command.
     */
    public function handle(
        CryptoActionsInterface $action,
        HandleCoinsContract $handle,
    ): void {

        try {
            $action->updateOrCreateCategory(
                action: $handle,
            );
            $this->info('Completed Succesfully');
        } catch (Throwable $e) {
            $this->error($e->getMessage());
        }

    }
}
