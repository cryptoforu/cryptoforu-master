<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\Actions;

use App\Models\Menu;
use App\Models\MenuItem;
use App\Services\Settings\Concerns\FormFactory;
use App\Services\Settings\Menu\DataObjects\MenuData;
use App\Services\Settings\Menu\DataObjects\MenuItemsData;
use Illuminate\Support\Collection;

class GetMenuForm
{
    use FormFactory;

    public function handle()
    {
        $initialValues = (new Collection(items: MenuItemsData::schema()));
        $options = [
            'parent_id' => MenuItem::parent()->get(['id', 'label'])->toArray(),
            'menu_id' => MenuData::collection(Menu::all(['id', 'label']))->toArray(),
        ];
        $schema = $this->generate(
            items: (new Collection(items: MenuItemsData::schema(type: 'n'))),
            options: $options
        );

        return [
            'initialValues' => $initialValues,
            'form_schema' => $schema,
            'form_route' => route('admin-settings.store'),
        ];
    }
}
