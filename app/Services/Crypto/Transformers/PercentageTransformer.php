<?php

declare(strict_types=1);

namespace App\Services\Crypto\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

final class PercentageTransformer implements Transformer
{
    public function __construct(
        public ?int $divide = null,
        public ?string $intl = 'en_US',
        public ?int $min = 2,
        public ?int $max = 2
    ) {

    }

    public function transform(
        DataProperty $property,
        mixed $value
    ): string|bool {
        return format_percentage(
            number: $value,
            divide: $this->divide,
            intl: $this->intl,
            min: $this->min,
            max: $this->max
        );
    }
}
