<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use Illuminate\Console\Command;
use Throwable;

class UpdateCryptoCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-crypto-categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Store and Update Crypto Categories';

    /**
     * Execute the console command.
     */
    public function handle(
        CryptoActionsInterface $action,
        HandleCategoriesContract $handle
    ): void {
        try {
            $action->updateOrCreateCategories(
                action: $handle
            );
            $this->info('The command was successful!');
        } catch (Throwable $e) {
            $e->getMessage();
            $this->error('Something went wrong!');
        }

    }
}
