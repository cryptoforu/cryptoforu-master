<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\Actions;

use App\Models\Menu;
use App\Models\MenuItem;
use App\Services\Settings\Menu\DataObjects\MenuItemsData;

class GetMenu
{
    public function __construct()
    {
    }

    public function handle(string $position = 'front_main'): array
    {
        $menu = Menu::ofPosition($position)->with('items')->first();

        $items = MenuItem::whereBelongsTo($menu)->where('parent_id', '0')->with('childs')->get();

        return MenuItemsData::collection(
            items: $items->map(fn ($item) => MenuItemsData::from($item))
        )->toArray();
    }
}
