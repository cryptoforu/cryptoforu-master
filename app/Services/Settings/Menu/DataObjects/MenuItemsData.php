<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\DataObjects;

use App\Models\MenuItem;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\WithoutValidation;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('MenuItems')]
final class MenuItemsData extends Data
{
    public function __construct(
        #[WithoutValidation]
        public Optional|int $id,
        public Optional|string $label,
        public Optional|string $route,
        public Optional|string|null $icon,
        public Optional|int $parent_id,
        public Optional|int $menu_id,
        #[
            DataCollectionOf(MenuItemsData::class),
            WithoutValidation
        ]
        public Optional|Lazy|DataCollection $childs,
        #[
            DataCollectionOf(MenuData::class),
            WithoutValidation
        ]
        public Optional|Lazy|DataCollection $menu
    ) {
    }

    public static function fromModel(MenuItem $menuItem): self
    {
        return new self(
            id: $menuItem->id,
            label: $menuItem->label,
            route: $menuItem->route,
            icon: $menuItem->icon,
            parent_id: $menuItem->parent_id,
            menu_id: $menuItem->menu_id,
            childs: Lazy::whenLoaded('childs', $menuItem, fn () => MenuItemsData::collection($menuItem->childs)),
            menu: Lazy::whenLoaded('menu', $menuItem, fn () => MenuData::collection($menuItem->menu))
        );
    }

    public static function rules(): array
    {
        return [
            'label' => ['string'],
            'route' => ['string'],
            'icon' => ['nullable'],
            'parent_id' => ['integer'],
            'menu_id' => ['integer'],
        ];
    }

    public static function schema(string $type = 'empty'): array
    {
        $schema = self::empty([
            'label' => 'empty' === $type ? '' : 'textfield',
            'route' => 'empty' === $type ? '' : 'textfield',
            'icon' => 'empty' === $type ? null : 'file',
            'parent_id' => 'empty' === $type ? 0 : 'select',
            'menu_id' => 'empty' === $type ? '' : 'select',
        ]);

        return Arr::except($schema, ['id', 'childs', 'menu']);
    }

    public static function make(Collection $items): array
    {
        return $items->map(
            fn ($item) => self::from($item),
        )->toArray();
    }
}
