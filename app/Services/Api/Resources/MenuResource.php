<?php

declare(strict_types=1);

namespace App\Services\Api\Resources;

use App\Contracts\ApiCacheContract;
use App\Models\Category;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Services\Settings\Menu\DataObjects\MenuItemsData;
use Illuminate\Support\Collection;

final readonly class MenuResource
{
  public function __construct(
    private ApiCacheContract $cache,
  ) {
  }

  /**
   * Get Front Menu Api Resource
   */
  public function get_front_menu(): array
  {
    return $this->cache->load_data(
      key: 'front_menu_data',
      callback: fn() => $this->map_menu()
    );
  }

  /**
   * Mapped Menu
   */
  private function map_menu(): array
  {
    return $this->make_menu()->map(function ($value) {
      if ('/learn-crypto' === $value->route) {
        $value->childs = MenuItemsData::collection(
          items: $this->get_categories()
        );
      }

      return $value;
    })->toArray();
  }

  /**
   * Make Menu Items Data Object
   */
  private function make_menu(): Collection
  {
    return MenuItemsData::fromData(
      attributes: MenuItem::ofItems(
        menu: Menu::ofMain()
      )
    );
  }

  /**
   * Get Categories For The Menu
   */
  private function get_categories(): array
  {
    return Category::query()->get(['id', 'name', 'category_links'])
      ->map(function ($category) {
        return [
          'id' => $category->id,
          'label' => $category->name,
          'route' => $category->category_links['category_link'],
        ];
      })->toArray();
  }
}
