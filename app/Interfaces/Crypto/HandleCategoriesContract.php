<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Cerbero\JsonParser\JsonParser;

interface HandleCategoriesContract
{
    /**
     * Handle Crypto Categories
     */
    public function handle(JsonParser $collection);

    public function getCategories(): array;
}
