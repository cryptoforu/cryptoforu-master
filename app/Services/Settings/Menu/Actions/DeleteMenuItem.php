<?php

namespace App\Services\Settings\Menu\Actions;

use App\Models\MenuItem;
use App\Services\Library\Concerns\Cleanable;

class DeleteMenuItem
{
    use Cleanable;

    /**
     * Delete Menu Item
     */
    public function handle(string|int $id): bool
    {
        $item = MenuItem::find($id);

        if ($item->exists) {
            $item->delete();
            $this->clean($item->icon);

            return true;
        }

        return false;
    }
}
