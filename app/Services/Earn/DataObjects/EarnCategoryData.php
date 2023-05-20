<?php

namespace App\Services\Earn\DataObjects;

use App\Models\EarnCategory;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript('EarnCategory')]
class EarnCategoryData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public Optional|Lazy|string $description,
        public Optional|Lazy|string $category_image,
        #[DataCollectionOf(EarnData::class)]
        public Optional|Lazy|DataCollection $earn,
    ) {
    }

    public static function fromModel(EarnCategory $earnCategory): self
    {
        return new self(
            id: $earnCategory->id,
            name: $earnCategory->name,
            description: $earnCategory->description,
            category_image: $earnCategory->category_image,
            earn: Lazy::whenLoaded('earn', $earnCategory, fn () => EarnData::collection($earnCategory->earn)),
        );
    }
}
