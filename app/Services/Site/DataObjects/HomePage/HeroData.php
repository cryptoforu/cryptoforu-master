<?php
namespace App\Services\Site\DataObjects\HomePage;

use Spatie\LaravelData\Data;

class HeroData extends Data
{
    public function __construct(
        public string $title,
        public string $description,
    ) {
    }
}
