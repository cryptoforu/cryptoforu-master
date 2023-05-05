<?php

declare (strict_types = 1);

namespace App\Services\Settings\Menu;

use App\Contracts\CacheStoreContract;
use App\Interfaces\Settings\MenuInterface;
use App\Services\Settings\Menu\Actions\GetMenu;
use App\Services\Settings\Menu\Actions\ShowMenus;

class MenuResources implements MenuInterface
{
    public function __construct(
        private readonly GetMenu $getMenu,
        private readonly ShowMenus $menus,
        private readonly CacheStoreContract $store,
    ) {
    }

    public function getMenu($position)
    {
        $menu = $this->getMenu->handle($position);

        return $this->store->load(
            key:$position,
            callback:$menu,
        );
    }

    public function show(): mixed
    {
        return $this->menus->handle();
    }
}
