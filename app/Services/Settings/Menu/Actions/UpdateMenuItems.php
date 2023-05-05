<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\Actions;

use App\Http\Requests\UpdateMenuItemRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Interfaces\Settings\ActionContracts\UpdateMenuItemContract;
use App\Models\MenuItem;
use Illuminate\Support\Facades\Cache;

final class UpdateMenuItems implements UpdateMenuItemContract
{
    /**
     * Construct Library
     */
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    public function handle(
        UpdateMenuItemRequest $request,
        string|int $id,
    ): bool {
        $validated = $request->validated();
        $nMenu = MenuItem::find($id);
        if ($request->hasFile('icon')) {
            $icon = $this->library->store(
                file: $validated['icon'],
                directory: 'menu_icons'
            );
            $nMenu->icon = '/img/cache/original/'.$icon['file_name'];
        } else {
            $request->collect()->map(function ($item, $key) use ($nMenu): void {
                $nMenu->$key = $item;
            });
        }
        $nMenu->save();

        if (empty($request->safe())) {
            return false;
        }
        Cache::store('settings')->clear();

        return true;
    }
}
