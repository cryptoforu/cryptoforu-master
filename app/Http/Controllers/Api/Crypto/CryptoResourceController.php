<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Crypto;

use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Models\Coin;
use App\Responses\CollectionResponse;
use App\Services\Crypto\ApiResource\CoinResource;
use App\Services\Crypto\DataObjects\CryptoCoin;
use Illuminate\Support\Facades\Cache;
use Spatie\QueryBuilder\QueryBuilder;
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
        $query = $this->coinQuery->handle(
            query: Coin::query()
        );

        return new CollectionResponse(
            data: CryptoCoin::make(
                attributes: $query
            )
        );
    }

    /**
     * Display the specified Crypto Api resource.
     */
    public function show(
        Coin $crypto
    ): JsonApiResourceCollection {
        $cryptoData = QueryBuilder::for(
            Coin::class
        )->findOrFail($crypto->id);

        return CoinResource::collection(
            resource: $cryptoData
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function gainers_losers(): CollectionResponse
    {
        return new CollectionResponse(
            data: Cache::remember('gainers-losers', now()->addDay(), function () {
                $gainers = Coin::ofPriceChange(
                    direction: 'desc'
                )->get();
                $losers = Coin::ofPriceChange()
                    ->get();

                return [
                    'gainers' => $gainers,
                    'losers' => $losers,
                ];
            })
        );

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): void
    {
    }
}
