<?php

declare(strict_types=1);

namespace App\Services\Settings;

use Illuminate\Support\Facades\Cache;
use Spatie\Valuestore\Valuestore;

final class SettingsResources extends Valuestore
{
    public function load($key, $callback)
    {
        if ($this->has($key)) {
            $value = $this->get($key);

            return $this->lazyLoad(
                key: $value,
                callback: $callback
            );
        }
        $this->put($key, uniqid($key, true));
        $value = $this->get($key);

        return $this->lazyLoad(
            key: $value,
            callback: $callback,
        );

    }

    public function lazyLoad($key, $callback)
    {
        if (Cache::tags(['settings', $key])->has($key)) {
            return Cache::get($key);
        }
        $data = $callback;
        Cache::tags(['settings', $key])->put($key, $data, 86400);

        return $data;

    }
}
