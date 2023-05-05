<?php

declare(strict_types=1);

namespace App\Services\Settings\Concerns;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;

trait TransformKeys
{
    /**
     * Transform Keys or Items Values from Array or Collection
     *
     * @param  string  $type
     * @param  Str  $callback
     */
    public function transform(array|Collection $values, $callback = 'headline', $type = 'key'): array|Collection
    {
        $str = new Str();
        if (gettype($values) === 'array') {
            return (new Collection(
                items: $values
            ))->transform(function (int|string $item, int|string $key) use ($type, $callback, $str) {
                $key = call_user_func_array([$str, $callback], [$type === 'key' ? $key : $item]);

                return collect([$key => $item]);
            })->collapse()->all();
        } else {
            $values->transform(
                function (int|string $item, int|string $key) use ($type, $callback, $str) {
                    $key = call_user_func_array([$str, $callback], [$type === 'key' ? $key : $item]);

                    return collect([$key => $item]);
                }
            )->collapse()->all();
        }
    }
}
