<?php

declare(strict_types=1);

namespace App\Services\Api\DataObjects;

use Spatie\LaravelData\Data;
use Spatie\LaravelData\Lazy;
use Spatie\LaravelData\Optional;

class BreadcrumbsData extends Data
{
    public function __construct(
        public string $label,
        public string $route,
        public string $meta_desc,
        public Optional|Lazy|BreadcrumbsData|null $parents
    ) {
    }
}
