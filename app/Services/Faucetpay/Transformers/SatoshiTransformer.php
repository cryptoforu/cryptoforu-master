<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

final class SatoshiTransformer implements Transformer
{
  public function __construct(
    public ?string $intl = 'en_US',
  ) {
  }

  public function transform(DataProperty $property, mixed $value): string|false
  {
    return format_satoshi(
      amount: $value,
      intl: $this->intl,
    );
  }
}
