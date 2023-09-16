<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\Actions;

use App\Http\Requests\StoreMenuItemRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Interfaces\Settings\ActionContracts\StoreMenuItemContract;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Cache;

final readonly class StoreMenuItems implements StoreMenuItemContract
{
  /**
   * Construct Library
   */
  public function __construct(
    private LibraryActionsInterface $library,
  ) {
  }

  /**
   * Store Menu Items
   */
  public function handle(StoreMenuItemRequest $from): bool
  {
    $validated = $from->validated();

    if ($from->hasFile('icon')) {
      $icon = $this->library->store(
        file: $validated['icon'],
        directory: 'menu_icons'
      );
      $icon_path = $icon['file_name'];
    }

    $menu = MenuItem::query()->create([
      'label' => $validated['label'],
      'route' => $validated['route'],
      'icon' => empty($icon_path) ? null : $icon_path,
      'parent_id' => $validated['parent_id'],
      'menu_id' => $validated['menu_id'],
    ]);
    $this->library->save(
      model: $menu,
      file: $icon ?? '',
      category: 2,
    );
    Cache::flush();

    return true;
  }
}
