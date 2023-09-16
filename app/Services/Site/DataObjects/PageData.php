<?php

declare(strict_types=1);

namespace App\Services\Site\DataObjects;

use App\Models\Site;
use Illuminate\Database\Eloquent\Model;
use Spatie\LaravelData\Data;

final class PageData extends Data
{
    public function __construct(
        public string $data_name,
        public mixed $data_values,
    ) {
    }

    public static function fromModel(Site $site): self
    {
        return new self(
            data_name: $site->data_name,
            data_values: $site->data_values,
        );
    }

    /**
     * @param  Site  $site
     */
    public static function fromDataValues(Model $site): self
    {
        return new self(
            data_name: $site->data_name,
            data_values: DataValuesData::collection(
                $site->data_values
            )
        );
    }
}
