<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\Actions;

use App\Models\Menu;
use App\Services\Settings\Menu\DataObjects\MenuData;

final class ShowMenus
{
    public function handle(): array
    {
        return MenuData::collection(
            items: Menu::with('items')->get()
        )->toArray();
    }
}
