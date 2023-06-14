<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

final class SocialLinksData extends Data
{
    public function __construct(
        public string $name,
        public string $href,
        public string $image,
    ) {
    }

    public static function fromCollection(Collection $collection): Collection
    {
        return $collection->map(
            fn ($item) => SocialLinksData::make($item)
        );
    }

    public static function make(mixed $attributes): SocialLinksData
    {
        return self::from($attributes);
    }
}
