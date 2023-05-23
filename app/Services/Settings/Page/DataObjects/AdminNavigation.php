<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\DataObjects;

use App\Models\Page;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('AdminNavigation')]
final class AdminNavigation extends Data
{
    public function __construct(
        public string $label,
        public string $route,
        #[DataCollectionOf(AdminNavigation::class)]
        public Optional|Lazy|DataCollection $childs,
        #[DataCollectionOf(AdminNavigation::class)]
        public Optional|Lazy|AdminNavigation $parents
    ) {
    }

    public static function fromModel(Page $page): self
    {
        return new self(
            label: $page->label,
            route: $page->route,
            childs: Lazy::whenLoaded('childs', $page, fn () => AdminNavigation::collection($page->childs)),
            parents: Lazy::whenLoaded('parents', $page, fn () => AdminNavigation::from($page->parents))
        );
    }

    public static function fromAttributes(array $attributes): self
    {
        return new self(
            label: (string) (data_get($attributes, 'label')),
            route: (string) (data_get($attributes, 'route')),
            childs: Lazy::when(fn () => ! empty(data_get($attributes, 'childs')), fn () => AdminNavigation::from(data_get($attributes, 'childs'))),
            parents: Lazy::when(fn () => ! empty(data_get($attributes, 'parents')), fn () => AdminNavigation::from(data_get($attributes, 'parents'))),
        );
    }
}
