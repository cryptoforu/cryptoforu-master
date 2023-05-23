<?php

declare(strict_types=1);

namespace App\Services\Settings\Casts;

use App\Services\Settings\Enums\FormEnum;
use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Support\DataProperty;

final class FormEnumCast implements Cast
{
    public function cast(DataProperty $property, mixed $value, array $context): FormEnum
    {
        return FormEnum::from($value);
    }
}
