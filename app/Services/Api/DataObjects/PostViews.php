<?php

declare(strict_types=1);

namespace App\Services\Api\DataObjects;

use Spatie\LaravelData\Data;

final class PostViews extends Data
{
    public function __construct(
        public int $id,
        public int $views,
        public array $ips
    ) {
    }

    public function make(string $ip): PostViews
    {
        return new self(
            id: $this->id,
            views: $this->views,
            ips: [
                'ip' => $ip,
            ]
        );
    }
}
