<?php

namespace App\Services\Settings\Menu\Actions;

use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\MenuItem;

class DeleteMenuItem
{

    public function __construct(
        private LibraryActionsInterface $action,
    ) {

    }
    /**
     * Delete Menu Item
     */
    public function handle(string | int $id): bool
    {
        $item = MenuItem::find($id);

        if ($item->exists) {
            if (!empty($item->images)) {
                foreach ($item->images as $img) {
                    $this->action->delete($img);
                }
            }
            $item->delete();

            return true;
        }

        return false;
    }
}
