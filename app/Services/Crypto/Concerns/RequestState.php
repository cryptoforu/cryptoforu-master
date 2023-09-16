<?php

declare(strict_types=1);

namespace App\Services\Crypto\Concerns;

use App\Services\Settings\SettingsResources;
use Closure;
use Illuminate\Foundation\Application;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

trait RequestState
{
    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function set_state(
        string $key,
        ?int $by,
        ?int $max
    ): \Illuminate\Contracts\Foundation\Application|Closure|null|SettingsResources|Application|array {
        $stateFrom = settings($key)['from'];
        $stateTo = settings($key)['to'];
        if (isset($max) && $stateTo >= $max) {
            settings()->flushStartingWith($key);
            settings()->put($key, ['from' => 1, 'to' => 3]);
        } else {
            settings()->put($key, ['from' => $stateFrom + $by, 'to' => $stateTo + 3]);
        }

        return settings($key);
    }
}
