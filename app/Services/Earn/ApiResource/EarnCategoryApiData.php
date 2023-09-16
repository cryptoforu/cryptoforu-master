<?php

declare(strict_types=1);

namespace App\Services\Earn\ApiResource;

use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;

final class EarnCategoryApiData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $description,
        public string $category_image,
        #[DataCollectionOf(EarnApiResource::class)]
        public Optional|Lazy|DataCollection $earn,
    ) {
    }
}
