<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Support\Collection;

trait Popular
{
    public function popular(
        Collection $collection,
        array $names,
        string $compare
    ): mixed {
        return $collection
            ->whereIn($compare, $names)
            ->map(fn ($item) => $item)
        ;
    }
}
