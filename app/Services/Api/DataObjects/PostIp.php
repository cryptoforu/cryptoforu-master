<?php

declare(strict_types=1);

namespace App\Services\Api\DataObjects;

use Spatie\LaravelData\Data;

class PostIp extends Data
{
    public function __construct(
        public array $ips
    ) {
    }
}
