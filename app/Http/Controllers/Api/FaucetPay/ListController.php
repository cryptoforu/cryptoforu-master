<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\FaucetPay;

use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Faucetpay\FaucetListCategoryContract;
use App\Interfaces\Faucetpay\FaucetPayServiceInterface;
use App\Interfaces\Faucetpay\GetFaucetsStatsContract;
use App\Models\FaucetListCategory;
use App\Responses\CollectionResponse;
use App\Services\Faucetpay\DataObjects\FaucetListCategoryData;
use Illuminate\Support\Facades\Cache;

final class ListController extends Controller
{
    /**
     * FaucetPay List Instance
     */
    public function __construct(
        protected FaucetPayServiceInterface $service,
        protected GetFaucetsStatsContract $stats,
        protected FaucetListCategoryContract $categoryContract,
        protected ApiCacheContract $cacheContract,
    ) {
    }

    /**
     * FaucetPay List Query Builder
     */
    public function index(
        FaucetListCategory $listCategory
    ): CollectionResponse {
        $query = $this->categoryContract->handle(
            query: FaucetListCategory::query()
        )->with('list')->find($listCategory->id);

        return new CollectionResponse(
            data: $this->service->list()->getList(
                query: $query
            )
        );
    }

    public function list_categories(): CollectionResponse
    {
        return new CollectionResponse(
            data: FaucetListCategoryData::collection(
                items: FaucetListCategory::query()->get()
            )->toArray()
        );
    }

    /**
     * FaucetPay List Statistics Api
     */
    public function stats(): CollectionResponse
    {
        $data = Cache::tags(['faucet-list', 'stats'])->remember(
            'faucet-stats',
            now()->addDay(),
            fn () => $this->stats->handle()
        );

        return new CollectionResponse(
            data: $data
        );
    }
}
