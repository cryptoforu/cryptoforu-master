<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCategoriesContract;
use Illuminate\Support\Collection;
use Spatie\Valuestore\Valuestore;

final class HandleCategories extends Valuestore implements HandleCategoriesContract
{
    /**
     * Handle Crypto Categories
     */
    public function handle(Collection $collection): void
    {
        $collection->take(50)->map(function ($item, $key): void {
            $this->put($key, $item);
        });
    }

    public function getCategories(): array
    {
        return $this->all();
    }
}
