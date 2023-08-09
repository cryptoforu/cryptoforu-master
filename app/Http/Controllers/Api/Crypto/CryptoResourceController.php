<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Crypto;

use App\Actions\Api\FilteredCollectionKeys;
use App\Actions\Api\SortableCollection;
use App\Contracts\ApiCacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Models\Crypto;
use App\Services\Crypto\ApiResource\CoinResource;
use Illuminate\Http\Request;
use TiMacDonald\JsonApi\JsonApiResourceCollection;

final class CryptoResourceController extends Controller
{
  /**
   * Crypto Api Resources Instance
   * @param  CoinQueryContract  $coinQuery
   * @param  ApiCacheContract  $cache
   */
  public function __construct(
    protected CoinQueryContract $coinQuery,
    protected readonly ApiCacheContract $cache,
  ) {
  }

  /**
   * Display Crypto Api Resources
   * @param  Request  $request
   * @return JsonApiResourceCollection
   */
  public function index(Request $request): JsonApiResourceCollection
  {

    $coins = $this->cache->load_data(
      key: $request->getRequestUri(),
      callback: $this->coinQuery->handle()
        ->pipeThrough([
          new FilteredCollectionKeys(),
          new SortableCollection(),
        ])
    );

    return CoinResource::collection(
      resource: $coins->colPaginate(
        $request->query('per_page', 25),
        $request->query('filter[data_name]')
      )->appends($request->query())
    );
  }

  /**
   * Display the specified Crypto Api resource.
   * @param  Crypto  $crypto
   * @return JsonApiResourceCollection
   */
  public function show(
    Crypto $crypto
  ): JsonApiResourceCollection {
    $cryptoData = $crypto->data_values
      ->pipeThrough([
        new FilteredCollectionKeys(),
        new SortableCollection(),
      ])->values();

    return CoinResource::collection(
      resource: $cryptoData
    );
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id): void
  {

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id): void
  {

  }
}
