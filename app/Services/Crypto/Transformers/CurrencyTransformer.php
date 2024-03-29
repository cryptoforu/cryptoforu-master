<?php

declare(strict_types=1);

namespace App\Services\Crypto\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

final class CurrencyTransformer implements Transformer
{
    public function __construct(
        public ?string $currency = 'USD',
        public ?string $intl = 'en_US'
    ) {

    }

    public function transform(
        DataProperty $property,
        mixed $value
    ): string|bool {
        return format_currency($value, $this->intl, $this->currency);
    }
}
