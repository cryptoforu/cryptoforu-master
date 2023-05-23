<?php

declare(strict_types=1);

namespace App\Services\Settings\Menu\DataObjects;

use App\Models\Menu;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('MenuData')]
final class MenuData extends Data
{
    public function __construct(
        public int $id,
        public string $label,
        public ?string $position,
        #[DataCollectionOf(MenuItemsData::class)]
        public Lazy|DataCollection $items
    ) {
    }

    public static function fromModel(Menu $menu): self
    {
        return new self(
            id: $menu->id,
            label: $menu->label,
            position: $menu->position,
            items: Lazy::whenLoaded('items', $menu, fn () => MenuItemsData::collection($menu->items))
        );
    }
}
