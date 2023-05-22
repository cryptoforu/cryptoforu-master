<?php

declare(strict_types=1);

namespace App\Console;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('telescope:prune')->daily();
        $schedule->command('app:process-crypto-coins')->hourly();
        $schedule->call(function (
            CryptoActionsInterface $action,
            HandleCategoriesContract $handle) {
            $action->updateOrCreateCategories(
                action: $handle
            );
        })->weekly();

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
