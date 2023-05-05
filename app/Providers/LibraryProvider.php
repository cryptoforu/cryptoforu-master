<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Library\LibraryActionsInterface;
use App\Interfaces\Library\LibraryResourceInterface;
use App\Services\Library\LibraryResource;
use App\Services\Library\LibraryService;
use Illuminate\Support\ServiceProvider;

class LibraryProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            abstract: LibraryActionsInterface::class,
            concrete: LibraryService::class
        );
        $this->app->bind(
            abstract: LibraryResourceInterface::class,
            concrete: LibraryResource::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
