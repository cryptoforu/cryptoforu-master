<?php

namespace App\Services\Faucetpay\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

class SatoshiTransformer implements Transformer
{

  public function __construct(
    public ?string $intl = 'en_US',
  ) {
  }

  public function transform(DataProperty $property, mixed $value): mixed
  {
    return format_satoshi(
      amount: $value,
      intl: $this->intl,
    );
  }
}
