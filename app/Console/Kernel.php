<?php

declare(strict_types=1);

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

final class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command('telescope:prune')->daily()->runInBackground();
        $schedule->command('app:process-crypto-coins')->hourlyAt(5)->runInBackground();
        $schedule->command('app:process-crypto-coins')->hourlyAt(10)->runInBackground();
        $schedule->command('app:process-crypto-coins')->hourlyAt(20)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(25)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(32)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(35)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(40)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(50)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(55)->runInBackground();
        $schedule->command('app:process-fp-coins')->hourlyAt(57)->runInBackground();
        $schedule->command('app:update-faucet-list')->everyFifteenMinutes()->runInBackground();
        $schedule->command('app:update-crypto-categories')->weekly()->runInBackground();
        $schedule->command('app:process-crypto-exchanges')->weekly()->runInBackground();
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
