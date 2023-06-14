<?php

declare(strict_types=1);

namespace App\Services\Settings\Concerns;

use App\Services\Settings\Data\FormData;
use App\Services\Settings\Enums\FormEnum;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

trait FormFactory
{
  public function generate(Collection $items, ?array $options = null): array
  {
    return $items->map(function ($value, $key) use ($options) {
      if (
        isset($options[$key]) && FormEnum::tryFrom($value)
          ->equals(FormEnum::select(), FormEnum::tags())
      ) {
        return FormData::from([
          'label' => Str::of($key)->headline(),
          'name' => $key,
          'type' => FormEnum::tryFrom($value),
          'options' => $options[$key],
        ]);
      }

      return FormData::from([
        'label' => Str::of($key)->headline(),
        'name' => $key,
        'type' => FormEnum::tryFrom($value),
      ]);
    })->toArray();
  }
}
