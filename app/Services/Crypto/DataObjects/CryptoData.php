<?php

declare(strict_types=1);

namespace App\Services\Crypto\DataObjects;

use App\Models\Crypto;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

final class CryptoData extends Data
{
    public function __construct(
        public readonly string $data_name,
        public readonly Collection $data_values,
    ) {
    }

    public static function fromModel(Crypto $crypto): self
    {
        return new self(
            data_name: $crypto->data_name,
            data_values: $crypto->data_values,
        );
    }
}
