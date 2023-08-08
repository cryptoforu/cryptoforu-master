<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

interface CryptoActionsInterface
{
  /**
   * Update or Create Crypto Categories
   */
  public function updateOrCreateCategories(
    HandleCategoriesContract $action
  ): void;

  /**
   * Update or Create Coins
   */
  public function updateOrCreateCoins(
    HandleCoinsContract $action
  ): void;

  public function updateOrCreateCategory(
    HandleCoinsContract $action
  ): void;

  public function updateOrCreateExchanges(
    HandleExchangesInterface $action,
  ): void;

  public function updateOrCreateFpCoins(
    HandleCoinsContract $action
  ): void;
}
