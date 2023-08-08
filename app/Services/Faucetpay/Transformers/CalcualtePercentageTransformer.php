<?php

namespace App\Services\Faucetpay\Transformers;

use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

class CalcualtePercentageTransformer implements Transformer
{

  /**
   *
   * @param  string|null  $intl
   */
  public function __construct(
    public ?string $intl = 'en_US',
  ) {
  }

  /**
   * @param  DataProperty  $property
   * @param  mixed  $value
   * @return mixed
   */
  public function transform(DataProperty $property, mixed $value): mixed
  {
    return cal_percentage(
      num_amount: $value['amount'],
      num_total: $value['total'],
      intl: $this->intl
    );
  }
}
