<?php

declare(strict_types=1);

if (! function_exists('settings')) {
    function settings($key = null, $default = null)
    {
        if ($key === null) {
            return app(App\Services\Settings\SettingsResources::class);
        }

        return app(App\Services\Settings\SettingsResources::class)->get($key, $default);
    }
}
