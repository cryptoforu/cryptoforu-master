<?php

declare(strict_types=1);

namespace App\Console;

use App\Interfaces\Crypto\CryptoActionsInterface;
use App\Interfaces\Crypto\HandleCategoriesContract;
use App\Interfaces\Crypto\HandleExchangesInterface;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

final class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('telescope:prune')->daily();
        $schedule->command('app:process-crypto-coins')->hourly();
        $schedule->command('app:process-crypto-coins')->hourlyAt(5);
        $schedule->command('app:process-crypto-coins')->hourlyAt(10);
        $schedule->command('app:process-categories')->hourlyAt(15);
        $schedule->command('app:process-categories')->hourlyAt(20);
        $schedule->command('app:process-categories')->hourlyAt(25);
        $schedule->command('app:process-categories')->hourlyAt(30);
        $schedule->command('app:process-categories')->hourlyAt(35);
        $schedule->command('app:process-categories')->hourlyAt(40);

        $schedule->call(function (
            CryptoActionsInterface $action,
            HandleExchangesInterface $handle,
        ): void {
            $action->updateOrCreateExchanges(
                action: $handle
            );
        })->saturdays()->name('Exchanges');

        $schedule->call(function (
            CryptoActionsInterface $action,
            HandleCategoriesContract $handle
        ): void {
            $action->updateOrCreateCategories(
                action: $handle
            );
        })->weekly()->name('Categories');

    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
