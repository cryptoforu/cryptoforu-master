<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects;

use Spatie\LaravelData\Data;

final class DataValuesData extends Data
{
    public function __construct(
        public string $key,
        public string $value,
    ) {
    }
}
