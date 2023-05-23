<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

use Spatie\LaravelData\Data;

final class HeroData extends Data
{
    public function __construct(
        public string $title,
        public string $description,
    ) {
    }
}
