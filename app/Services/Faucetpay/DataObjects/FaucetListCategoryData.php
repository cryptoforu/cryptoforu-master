<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Models\FaucetListCategory;
use App\Services\Faucetpay\Concerns\Sortable;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\File;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Lazy;

final class FaucetListCategoryData extends Data
{
    use Sortable;

    public function __construct(
        public readonly string $symbol,
        public readonly string $name,
        public readonly string $image,
        public readonly string $color,
        #[DataCollectionOf(FaucetData::class)]
        public Lazy|DataCollection $list
    ) {
    }

    public static function fromModel(
        FaucetListCategory $listCategory
    ): FaucetListCategoryData {
        return new self(
            symbol: $listCategory->symbol,
            name: $listCategory->name,
            image: $listCategory->image,
            color: $listCategory->color,
            list: Lazy::whenLoaded(
                'list',
                $listCategory,
                fn () => FaucetData::make(
                    data: $listCategory->list()
                )
            )
        );
    }

    public function with(): array
    {
        $time = File::lastModified(storage_path('app/list/list_data.json'));
        $parsed = Carbon::parse($time)->diffForHumans(
            [
                'parts' => '3',
                'join' => true,
            ]
        );

        return [
            'updated_at' => $parsed,
        ];
    }
}
