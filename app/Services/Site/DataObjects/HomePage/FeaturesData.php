<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

final class FeaturesData extends Data
{
    public function __construct(
        public string $name,
        public string $link,
        public string $image,
        public string $description,
    ) {
    }

    public static function fromCollection(Collection $collection): Collection
    {
        return $collection->map(
            fn ($item) => FeaturesData::make($item)
        );
    }

    public static function make(mixed $attributes): FeaturesData
    {
        return self::from($attributes);
    }
}
