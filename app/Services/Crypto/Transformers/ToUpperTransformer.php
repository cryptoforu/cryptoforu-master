<?php

declare(strict_types=1);

namespace App\Services\Crypto\Transformers;

use Illuminate\Support\Str;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

final class ToUpperTransformer implements Transformer
{
    public function transform(DataProperty $property, mixed $value): string
    {
        return Str::upper($value);
    }
}
