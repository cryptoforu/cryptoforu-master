<?php

declare(strict_types=1);

namespace App\Services\Site\Concerns;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

trait Collectable
{
    public function collectable(
        array $attributes,
        Collection $data_values,
        ?string $image_path = null
    ): array {
        $initial = (new Collection(
            items: $attributes,
        ))->map(function ($item, $key) use ($image_path) {
            if (isset($image_path)) {
                $item['image'] = $image_path;

                return $item;
            }

            return $item;

        });

        $key = Arr::get($initial, '0.id');
        $collection = $data_values->get($key);
        $new_values = $initial->merge($collection)->transform(function (
            $item,
            $key
        ) {
            $item['id'] = uniqid($item['id'], true);

            return $item;
        });
        $filtered = $new_values->reject(fn (
            $value,
            $key
        ) => empty($value) || null === $value);
        $transform_initial = $initial->transform(function ($item, $key) {
            $item['id'] = uniqid($item['id'], true);

            return $item;
        });

        return [
            'key' => $key,
            'new_values' => $filtered,
            'initial' => $transform_initial,
        ];
    }
}
