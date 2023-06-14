<?php

declare(strict_types=1);

namespace App\Services\Crypto\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

final class PercentageTransformer implements Transformer
{
  /**
   * @param  int|null  $divide
   * @param  string|null  $intl
   */
  public function __construct(
    public ?int $divide = null,
    public ?string $intl = 'en_US'
  ) {

  }

  public function transform(
    DataProperty $property,
    mixed $value
  ): mixed {
    return format_percentage($value, $this->divide, $this->intl);
  }
}
