<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\DataObjects;

use App\Models\FaucetListCategory;
use App\Services\Faucetpay\Concerns\Sortable;
use Illuminate\Support\Facades\Request;
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
                function () use ($listCategory) {
                    return Request::whenHas(
                        'page',
                        fn (
                        ) => FaucetData::collection($listCategory->list()->jsonPaginate()->appends(Request::query())),
                        static fn () => FaucetData::collection(
                            items: $listCategory->list->sortBy(
                                [
                                    ['health', 'desc'],
                                    ['paid_today', 'desc'],
                                    ['total_users_paid', 'desc'],
                                ]
                            )->values()
                        )
                    );
                }
            )
        );
    }
}
