<?php

namespace App\Services\Crypto\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

class PercentageTransformer implements Transformer
{
    public function __construct(
        public ?int $divide = null,
        public ?string $intl = 'en_US'
    ) {

    }

    public function transform(
        DataProperty $property,
        mixed $value): mixed
    {
        return format_percentage($value, $this->divide, $this->intl);
    }
}
