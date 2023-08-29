<?php

declare(strict_types=1);

namespace App\Services\Api\Resources;

use App\Contracts\CountActionContract;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Request;
use Spatie\Valuestore\Valuestore;

final class CountActions extends ValueStore implements CountActionContract
{
    /**
     * @return mixed|null
     */
    public function get_count(string $uniqueKey): mixed
    {
        if ($this->has($uniqueKey)) {
            return $this->get($uniqueKey);
        }

        return null;
    }

    /**
     * Should Count Post
     */
    public function should_count(string $uniqueKey): bool
    {
        if ($this->has(
            name: $uniqueKey
        )) {
            $values = $this->get(name: $uniqueKey);

            return ! ($this->check_ip($values['ips'], Request::ip()));
        }

        return true;
    }

    /**
     * Check if Ip Exists
     */
    private function check_ip(array $values, string $ip): bool
    {
        return Arr::has($values, $ip);
    }

    /**
     * Store or Update and Return
     */
    public function count_views(Post $post, string $ip): void
    {
        $key = "post-{$post->id}";
        if ($this->has($key)) {
            $values = $this->get($key);
            $nowTime = Carbon::now()->timestamp;
            if ($nowTime > $values['timestamp']) {
                data_set($values, 'ips', []);
            }
            if ($this->check_ip($values['ips'], $ip)) {
                return;
            }
            $this->update($values, views($post)->unique()->count(), $ip);

            return;
        }

        $this->store($post, $ip);
    }

    /**
     * Update Views
     */
    private function update(mixed $values, int $count, string $ip): void
    {
        data_set($values, 'views', $count);
        Arr::add($values, 'ips', $ip);
    }

    /**
     * Store new View
     */
    private function store(Post $post, string $ip): void
    {
        $key = "post-{$post->id}";

        $this->put(
            $key,
            [
                'timestamp' => Carbon::now()->addDay()->timestamp,
                'views' => 1,
                'ips' => [$ip],
            ]
        );

        $this->get($key);
    }
}
