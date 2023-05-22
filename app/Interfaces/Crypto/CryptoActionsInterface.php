<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

interface CryptoActionsInterface
{
    /**
     * Update or Create Crypto Categories
     *
     * @return void
     */
    public function updateOrCreateCategories(
        HandleCategoriesContract $action
    );

    /**
     * Update or Create Coins
     *
     * @return void
     */
    public function updateOrCreateCoins(
        HandleCoinsContract $action
    );
}
