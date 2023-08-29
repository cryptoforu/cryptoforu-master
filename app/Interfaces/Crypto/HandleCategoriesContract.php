<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Illuminate\Support\Collection;

interface HandleCategoriesContract
{
    /**
     * Handle Crypto Categories
     */
    public function handle(Collection $collection);

    public function getCategories(): array;
}
