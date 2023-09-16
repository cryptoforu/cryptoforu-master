<?php

declare(strict_types=1);

namespace App\Services\Crypto\Transformers;

use App\Enums\PriceStatusEnum;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

final class ColorTransformer implements Transformer
{
  public function transform(DataProperty $property, mixed $value): string
  {
    return $value > 0 ? PriceStatusEnum::POSITIVE()->status() : PriceStatusEnum::NEGATIVE()->status();
  }
}
