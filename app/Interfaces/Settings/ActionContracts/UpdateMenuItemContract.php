<?php

declare(strict_types=1);

namespace App\Interfaces\Settings\ActionContracts;

use App\Http\Requests\UpdateMenuItemRequest;
use App\Models\MenuItem;

interface UpdateMenuItemContract
{
    /**
     * Update Menu Item
     *
     * @param  MenuItem  $menu
     */
    public function handle(
        UpdateMenuItemRequest $request,
        string|int $id
    ): bool;
}
