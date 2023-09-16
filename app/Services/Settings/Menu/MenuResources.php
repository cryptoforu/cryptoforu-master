<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu;

use App\Interfaces\Settings\MenuInterface;
use App\Services\Settings\Menu\Actions\GetMenu;
use App\Services\Settings\Menu\Actions\ShowMenus;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

final readonly class MenuResources implements MenuInterface
{
  public function __construct(
    private GetMenu $getMenu,
    private ShowMenus $menus,
  ) {
  }

  /**
   * @throws ContainerExceptionInterface
   * @throws NotFoundExceptionInterface
   */
  public function getMenu($position)
  {
    $menu = $this->getMenu->handle($position);
    return lazy_load()->load(
      key: $position,
      callback: fn() => $menu,
    );
  }

  public function show(): array
  {
    return $this->menus->handle();
  }
}
