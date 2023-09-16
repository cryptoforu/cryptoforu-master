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
        $schedule->command('app:process-top-coins')->hourly();
        $schedule->command('app:process-top-coins')->hourlyAt(2)->runInBackground();
        $schedule->command('app:process-top-coins')->hourlyAt(4)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(6)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(8)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(10)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(12)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(14)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(16)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(18)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(20)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(22)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(24)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(26)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(28)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(30)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(32)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(34)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(36)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(38)->runInBackground();
        $schedule->command('app:process-categories')->hourlyAt(40)->runInBackground();
        $schedule->command('app:process-fp-coins')->hourlyAt(42)->runInBackground();
        $schedule->command('app:update-faucet-list')->everyFifteenMinutes()->runInBackground();
        $schedule->command('telescope:prune')->daily()->runInBackground();
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
