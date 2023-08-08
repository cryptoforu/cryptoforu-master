<?php

declare(strict_types=1);

namespace App\Services\Api\Resources;

use App\Contracts\ApiCacheContract;
use App\Models\Post;
use App\Services\Api\ApiService;
use Carbon\Carbon;
use Illuminate\Support\Arr;

class CountActions
{
  public function __construct(
    private readonly ApiService $apiService,
    private readonly ApiCacheContract $cache,
    private readonly Post $post,
    private readonly string $ip,
  ) {
  }

  public function count()
  {
    $key = "post-{$this->post->id}";
    $values = $this->apiService->get($key);

    if ($this->apiService->has($key)) {
      $timestamp = $this->apiService->get($key)['timestamp'];
      $nowTime = Carbon::now()->timestamp;
      if ($timestamp < $nowTime) {
        $this->apiService->flush();
      }
    }

    if (null !== $values) {
      $ips = data_get($values, "ips.*.{$this->ip}");
      if (null === $ips) {
        $newIps = Arr::add($values['ips'], 'ip', $this->ip);
        views($this->post)->record();
        $this->apiService->put(
          $key,
          ['views' => views($this->post)->unique()->count(), 'ips' => $newIps]
        );
      }
      $values['views'] = views($this->post)->unique()->count();
      $this->apiService->put(
        $key,
        $values
      );
      return $values;
    }
    $this->apiService->put(
      $key,
      [
        'timestamp' => Carbon::now()->addDay()->timestamp,
        'views' => 1,
        'ips' => ['ip' => $this->ip],
      ]
    );

    return $this->apiService->get($key);
  }

  public function get_all()
  {
    return $this->cache->load_data(
      key: 'all_views',
      callback: fn() => $this->apiService->all()
    );
  }
}
