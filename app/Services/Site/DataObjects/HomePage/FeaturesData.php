<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

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
}
