<?php

declare(strict_types=1);

namespace App\Services\Api\Resources;

use App\Contracts\CountActionContract;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Spatie\Valuestore\Valuestore;

final class CountActions extends ValueStore implements CountActionContract
{

  public function should_count(Post $post, string $ip): bool
  {

    if ($this->has("post-{$post->id}")) {
      $values = $this->get("post-{$post->id}");
      if ($this->check_ip($values, $ip)) {
        return false;
      }
      return true;
    }
    return true;
  }

  /**
   * Check If Ip Already Exists
   * @param  array  $values
   * @param  string  $ip
   * @return bool
   */
  private function check_ip(array $values, string $ip): bool
  {
    if (!empty(data_get($values, "ips.*.{$ip}"))) {
      return true;
    }
    return false;
  }

  public function count_views(Post $post, string $ip)
  {
    $key = "post-{$post->id}";
    if ($this->has($key)) {
      $timestamp = $this->get($key)['timestamp'];
      $nowTime = Carbon::now()->timestamp;
      if ($timestamp < $nowTime) {
        $this->flush();
      }

    }
    return $this->storeOrUpdate($post, $ip);
  }

  private function storeOrUpdate(Post $post, string $ip)
  {
    $key = "post-{$post->id}";
    if ($this->has($key)) {
      $values = $this->get($key);
      if ($this->check_ip($values, $ip)) {
        return $values;
      }
      data_set($values, 'views', views($post)->unique()->count());
      Arr::add($values, 'ips', $ip);
      return $values;
    }
    $this->put(
      $key,
      [
        'timestamp' => Carbon::now()->addDay()->timestamp,
        'views' => 1,
        'ips' => [$ip],
      ]
    );
    return $this->get($key);
  }
}
