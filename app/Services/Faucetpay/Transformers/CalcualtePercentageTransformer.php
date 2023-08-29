<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

class CalcualtePercentageTransformer implements Transformer
{
    public function __construct(
        public ?string $intl = 'en_US',
    ) {
    }

    public function transform(
        DataProperty $property,
        mixed $value
    ): string|false {
        return cal_percentage(
            num_amount: $value['amount'],
            num_total: $value['total'],
            intl: $this->intl
        );
    }
}
