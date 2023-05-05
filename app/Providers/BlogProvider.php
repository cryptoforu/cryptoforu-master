<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\Blog\BlogActionInterface;
use App\Interfaces\Blog\BlogInterface;
use App\Interfaces\Blog\Contracts\StoreCategoryContract;
use App\Interfaces\Blog\Contracts\UpdateCategoryContract;
use App\Services\Blog\Actions\StoreCategory;
use App\Services\Blog\Actions\UpdateCategory;
use App\Services\Blog\BlogActions;
use App\Services\Blog\BlogService;
use Illuminate\Support\ServiceProvider;

class BlogProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(
            abstract: BlogInterface::class,
            concrete: BlogService::class
        );

        $this->app->bind(
            abstract: BlogActionInterface::class,
            concrete: BlogActions::class,
        );
        $this->app->bind(
            abstract: StoreCategoryContract::class,
            concrete: StoreCategory::class,
        );
        $this->app->bind(
            abstract: UpdateCategoryContract::class,
            concrete: UpdateCategory::class,
        );
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
    }
}
