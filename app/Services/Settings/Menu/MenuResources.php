<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu;

use App\Interfaces\Settings\MenuInterface;
use App\Services\Settings\Menu\Actions\GetMenu;
use App\Services\Settings\Menu\Actions\ShowMenus;

final class MenuResources implements MenuInterface
{
    public function __construct(
        private readonly GetMenu $getMenu,
        private readonly ShowMenus $menus,
    ) {
    }

    public function getMenu($position)
    {
        $menu = $this->getMenu->handle($position);

        return lazy_load()->load(
            key: $position,
            callback: fn () => $menu,
        );
    }

    public function show(): mixed
    {
        return $this->menus->handle();
    }
}
