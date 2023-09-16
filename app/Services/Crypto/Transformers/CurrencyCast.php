<?php

declare(strict_types=1);

namespace App\Services\Crypto\Transformers;

use Spatie\LaravelData\Casts\Cast;
use Spatie\LaravelData\Casts\Castable;
use Spatie\LaravelData\Support\DataProperty;

final class CurrencyCast implements Castable
{
    public function __construct(public float $price)
    {
    }

    public static function dataCastUsing(...$arguments): Cast
    {
        return new class() implements Cast
        {
            public function cast(DataProperty $property, mixed $value, array $context): mixed
            {
                return format_currency($value);
            }
        };
    }
}
