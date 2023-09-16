<?php

declare(strict_types=1);

namespace App\Interfaces\Settings\ActionContracts;

use App\Http\Requests\StoreMenuItemRequest;

interface StoreMenuItemContract
{
  /**
   * Store Menu Items
   *
   * @param  StoreMenuItemRequest  $from
   * @return bool
   */
  public function handle(StoreMenuItemRequest $from): bool;
}
