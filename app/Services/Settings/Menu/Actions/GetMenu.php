<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\Actions;

use App\Interfaces\Settings\GetMenuContract;
use App\Models\Menu;
use App\Models\MenuItem;
use App\Services\Settings\Menu\DataObjects\MenuItemsData;
use Illuminate\Support\Facades\Cache;

final class GetMenu implements GetMenuContract
{
    public function handle(string $position = 'front_main'): array
    {
        return Cache::rememberForever($position, function () use ($position) {
            return MenuItemsData::make(
                items: MenuItem::ofItems(
                    Menu::ofMain($position)
                )
            );
        });

    }
}
