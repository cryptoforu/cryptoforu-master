<?php

namespace App\Services\Api\Resources;

use App\Contracts\ApiCacheContract;
use App\Interfaces\Settings\GetMenuContract;
use App\Models\Category;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Services\Settings\Menu\DataObjects\MenuItemsData;
use Illuminate\Support\Collection;

final readonly class MenuResource
{

  public function __construct(
    private GetMenuContract $menu,
    private ApiCacheContract $cache,
  ) {
  }

  /**
   * Get Front Menu Api Resource
   * @return array
   */
  public function get_front_menu(): array
  {
    return $this->cache->load_data(
      key: 'front_menu_data',
      callback: function () {
        return $this->map_menu();
      }
    );
  }

  /**
   * Mapped Menu
   * @return array
   */
  private function map_menu(): array
  {
    return $this->make_menu()->map(function ($value) {
      if ($value->route === '/learn-crypto') {
        $value->childs = MenuItemsData::collection(
          items: $this->get_categories()
        );
      }
      return $value;
    })->toArray();
  }

  /**
   * Make Menu Items Data Object
   * @return Collection
   */
  private function make_menu(): Collection
  {
    return MenuItemsData::fromData(
      attributes: MenuItem::ofItems(
        menu: Menu::ofMain('front_main')
      )
    );
  }

  /**
   * Get Categories For The Menu
   * @return array
   */
  private function get_categories(): array
  {
    return Category::query()->get(['id', 'name', 'category_links'])
      ->map(function ($category) {
        return [
          'id' => $category->id,
          'label' => $category->name,
          'route' => $category->category_links['category_link']
        ];
      })->toArray();
  }
}
