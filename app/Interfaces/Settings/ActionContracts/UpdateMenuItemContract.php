<?php

declare(strict_types=1);

namespace App\Interfaces\Settings\ActionContracts;

use App\Http\Requests\UpdateMenuItemRequest;

interface UpdateMenuItemContract
{
  /**
   * Update Menu Item
   *
   * @param  UpdateMenuItemRequest  $request
   * @param  string|int  $id
   * @return bool
   */
  public function handle(
    UpdateMenuItemRequest $request,
    string|int $id
  ): bool;
}
