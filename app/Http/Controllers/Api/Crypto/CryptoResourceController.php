<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Crypto;

use App\Actions\Api\FilteredCollectionKeys;
use App\Actions\Api\PaginatedData;
use App\Actions\Api\SortableCollection;
use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Models\Coin;
use App\Models\Crypto;
use App\Responses\CollectionResponse;
use App\Services\Api\DataObjects\DataTable;
use App\Services\Crypto\ApiResource\CoinResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Pipeline;
use TiMacDonald\JsonApi\JsonApiResourceCollection;

final class CryptoResourceController extends Controller
{
    /**
     * Crypto Api Resources Instance
     */
    public function __construct(
        protected CoinQueryContract $coinQuery,
        protected readonly ApiCacheContract $cache,
    ) {
    }

    /**
     * Display Crypto Api Resources
     */
    public function index(): CollectionResponse
    {
        $data = Pipeline::send($this->coinQuery->handle(
            query: Coin::query()
        ))
            ->through([
                PaginatedData::class,
            ])->then(fn ($data) => $data)
        ;

        return new CollectionResponse(
            data: DataTable::fromCoins($data)
        );
    }

    /**
     * Display the specified Crypto Api resource.
     */
    public function show(
        Crypto $crypto
    ): JsonApiResourceCollection {
        $cryptoData = $crypto->data_values
            ->pipeThrough([
                new FilteredCollectionKeys(),
                new SortableCollection(),
            ])->values()
        ;

        return CoinResource::collection(
            resource: $cryptoData
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {
        $query = Coin::query()->find($id);
        $query->name = $request->input('name');
        $query->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
    }
}
