<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Illuminate\Support\Collection;

interface CryptoActionsInterface
{
    public function handleTopCoins(HandleCoinsContract $action);

    /**
     * Update or Create Crypto Categories
     */
    public function updateOrCreateCategories(
        HandleCategoriesContract $action
    ): void;

    public function updateOrCreateCategory(
        HandleCoinsContract $action
    ): Collection;

    public function updateOrCreateExchanges(
        HandleExchangesInterface $action,
    ): void;

    public function fp_coins(
        HandleCoinsContract $action
    ): void;
}
