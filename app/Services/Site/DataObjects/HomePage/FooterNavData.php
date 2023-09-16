<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

use Spatie\LaravelData\Data;

final class FooterNavData extends Data
{
    public function __construct(
        public string $id,
        public string $name,
        public string $href,
    ) {
    }
}
