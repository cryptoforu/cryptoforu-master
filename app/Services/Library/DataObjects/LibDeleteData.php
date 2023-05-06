<?php
declare (strict_types = 1);
namespace App\Services\Library\DataObjects;

use Spatie\LaravelData\Data;

class LibDeleteData extends Data
{
    public function __construct(
        public string $file_url,
        public array $file_conversions
    ) {
    }

    public static function fromArray(array $attributes): self
    {
        return new self(
            file_url:strval(data_get($attributes, 'file_url')),
            file_conversions:[
                'lg' => strval(data_get($attributes, 'file_conversions.lg')),
                'md' => strval(data_get($attributes, 'file_conversions.md')),
                'sm' => strval(data_get($attributes, 'file_conversions.sm')),
            ],
        );
    }
}
