<?php

namespace App\Traits;

use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

trait Selectable
{
    /**
     * Simple Helper for Menu Component
     *
     * @var string
     */
    public function selectable(array|Collection $collection, $keyFrom): array
    {
        $keyType = gettype($keyFrom);
        $keyLength = Str::of($keyFrom)->length();
        $values = '';
        if ($keyType !== 'string' || $keyLength < 2) {
            return with('error', 'Plese provide string or  longer key');
        }

        if (is_array($collection)) {
            $values = Arr::map($collection, fn ($item, $key) => [
                'id' => Str::slug($key),
                'label' => Str::headline($key),
            ]);
        } else {
            $values = $collection->map(fn ($item, $key) => [
                'id' => Str::slug($key),
                'label' => Str::headline($key),
            ]);
        }

        return collect($values)->values()->all();
    }
}
