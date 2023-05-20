<?php

namespace App\Providers;

use App\Interfaces\FrontEnd\FrontEndInterface;
use App\Services\FrontEnd\FrontEndService;
use Illuminate\Support\ServiceProvider;

class FrontEndProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            abstract : FrontEndInterface::class,
            concrete: FrontEndService::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
