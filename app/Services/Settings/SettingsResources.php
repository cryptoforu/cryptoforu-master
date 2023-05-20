<?php

declare(strict_types=1);

namespace App\Services\Settings;

use Illuminate\Support\Facades\Cache;
use Spatie\Valuestore\Valuestore;

class SettingsResources extends Valuestore
{
    public function __construct(
    ) {
    }

    public function load($key, $callback)
    {
        if ($this->has($key)) {
            $value = $this->get($key);
            $data = $this->lazyLoad(
                key: $value,
                callback: $callback
            );

            return $data;
        } else {
            $this->put($key, uniqid($key));
            $value = $this->get($key);
            $data = $this->lazyLoad(
                key: $value,
                callback: $callback,
            );

            return $data;
        }
    }

    public function lazyLoad($key, $callback)
    {
        if (Cache::store('settings')->has($key)) {
            $data = Cache::store('settings')->get($key);

            return $data;
        } else {
            $data = $callback;
            Cache::store('settings')->set($key, $data, 86400);

            return $data;
        }
    }
}
