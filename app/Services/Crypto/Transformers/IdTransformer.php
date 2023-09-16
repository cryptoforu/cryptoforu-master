<?php

declare(strict_types=1);

namespace App\Services\Crypto\Transformers;

use Illuminate\Support\Str;
use Illuminate\Support\Stringable;
use Spatie\LaravelData\Support\DataProperty;
use Spatie\LaravelData\Transformers\Transformer;

final class IdTransformer implements Transformer
{
    public function __construct(
        public array $replace
    ) {
    }

    public function transform(DataProperty $property, mixed $value): string
    {
        $replaced = '';
        foreach ($this->replace as $key => $v) {
            $replaced = Str::of($value)
                ->whenContains(
                    $key,
                    fn (Stringable $string) => $string->replace(
                        $value,
                        $v
                    )->slug('-')
                );
        }

        return (string) $replaced;

    }
}
