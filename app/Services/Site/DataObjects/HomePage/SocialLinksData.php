<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects\HomePage;

use Spatie\LaravelData\Data;

class SocialLinksData extends Data
{
    public function __construct(
        public string $name,
        public string $href,
        public string $image,
    ) {
    }
}
