<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects;

use App\Models\Site;
use Illuminate\Support\Collection;
use Spatie\LaravelData\Data;

final class PageData extends Data
{
    public function __construct(
        public string $data_name,
        public Collection $data_values,
    ) {
    }

    public static function fromModel(Site $site): self
    {
        return new self(
            data_name: $site->data_name,
            data_values: $site->data_values,
        );
    }
}
