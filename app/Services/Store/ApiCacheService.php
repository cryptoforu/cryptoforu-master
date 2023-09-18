<?php

declare(strict_types=1);

namespace App\Services\Store;

use App\Contracts\ApiCacheContract;
use Closure;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Spatie\Valuestore\Valuestore;

final class ApiCacheService implements ApiCacheContract
{
  private string $fileName = 'api_cache_keys.json';
  private array $tags;

  /**
   *
   * @param array $tags
   * @method api_cache_key()
   * @method generate_api_key()
   */

  public function __construct(array $tags)
  {
    $this->tags = $tags;
  }

  /**
   * Get Item From The Cache or Store If It Doesn't exist
   */
  public function load_data(
    string $key,
    Closure $callback,
    Carbon|int $ttl = 3600
  ): mixed {
    $defKey = "$key:" . $this->api_cache_key();
    return Cache::tags($this->tags)
      ->remember(
        key: $defKey,
        ttl: $ttl,
        callback: $callback
      );
  }

  /**
   * Get Cache Key Or Generate New
   */
  private function api_cache_key()
  {
    $key = $this->generate_api_key();
    if (!$this->store()->has($key)) {
      $this->store()->put(
        name: $key,
        value: Str::orderedUuid()
      );
    }
    return $this->store()->get($key);
  }

  private function generate_api_key(): string
  {
    $requestInput = Request::collect();
    if ($requestInput->isEmpty()) {
      return Str::of(Str::replaceLast('/', '', Request::path()))->toString();
    }
    return Str::of(Str::replaceLast('/', '', Request::path()))->append(
      ":{$requestInput->flatten()->implode('-')}"
    )->trim()->toString();
  }

  private function store(): Valuestore
  {
    return Valuestore::make(storage_path("app/$this->fileName"));
  }

  /**
   * Flush cache
   */
  public function flush_data(?array $tag = null): void
  {
    if (null === $tag) {
      Cache::flush();
    }
    Cache::tags($tag)->flush();
  }

}
