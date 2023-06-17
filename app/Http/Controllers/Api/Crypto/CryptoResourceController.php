<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Crypto;

use App\Contracts\CacheContract;
use App\Http\Controllers\Controller;
use App\Interfaces\Crypto\Contracts\CoinQueryContract;
use App\Services\Crypto\ApiResource\CoinResource;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use TiMacDonald\JsonApi\JsonApiResourceCollection;

final class CryptoResourceController extends Controller
{
  /**
   * Crypto Api Resources
   * @param  CoinQueryContract  $coinQuery
   * @param  CacheContract  $cache
   */
  public function __construct(
    private readonly CoinQueryContract $coinQuery,
    private readonly CacheContract $cache,
  ) {
  }

  /**
   * Display Crypto Resources
   * @param  Request  $request
   * @return JsonApiResourceCollection
   */
  public function index(Request $request): JsonApiResourceCollection
  {

    $coins = $request->whenHas(
      'sort',
      function (string $input) use ($request): Collection {
        return $this->coinQuery->handle()->sortBy(
          callback: $input,
          descending: ('asc' === $request->query('by')),
        );
      },
      fn(): Collection => $this->coinQuery->handle()
    );
    if ($request->has('only')) {
      $data = $this->cache->load(
        key: 'crypto-'.$request->string('filter[data_name]').'-'.$request->string('only'),
        callback: fn(
        ) => $coins->only($request->string('only')->split('/[\s,]+/')),
        ttl: now()->addDay(),
      );
    } else {
      $data = $this->cache->load(
        key: 'crypto-'.$request->string('filter[data_name]') ?? 'crypto-resource',
        callback: fn() => $coins,
        ttl: now()->addDay(),
      );
    }

    return CoinResource::collection(
      resource: $data->colPaginate(
        $request->query('per_page', 25)
      )
        ->appends($request->query())
    );
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id): void
  {

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
