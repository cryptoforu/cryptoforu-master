<?php
namespace App\Services\Site\DataObjects\HomePage;

use Spatie\LaravelData\Data;

class FeaturesData extends Data
{
    public function __construct(
        public string $name,
        public string $link,
        public string $image,
        public string $description,
    ) {
    }
}
