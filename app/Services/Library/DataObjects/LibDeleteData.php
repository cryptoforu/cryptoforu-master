<?php

declare(strict_types=1);

namespace App\Services\Library\DataObjects;

use Spatie\LaravelData\Data;

final class LibDeleteData extends Data
{
    public function __construct(
        public string $file_url,
        public array $file_conversions
    ) {
    }

    public static function fromArray(array $attributes): self
    {
        return new self(
            file_url: (string) (data_get($attributes, 'file_url')),
            file_conversions: [
                'lg' => (string) (data_get($attributes, 'file_conversions.lg')),
                'md' => (string) (data_get($attributes, 'file_conversions.md')),
                'sm' => (string) (data_get($attributes, 'file_conversions.sm')),
            ],
        );
    }
}
