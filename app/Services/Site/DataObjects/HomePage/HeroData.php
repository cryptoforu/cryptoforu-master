<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

final class HeroData extends Data
{
    public function __construct(
        public string $title,
        public string $description,
    ) {
    }

    public static function fromCollection(Collection $collection): Collection
    {
        return $collection->map(
            fn ($item) => HeroData::make($item)
        );
    }

    public static function make(mixed $attributes): HeroData
    {
        return self::from($attributes);
    }
}
