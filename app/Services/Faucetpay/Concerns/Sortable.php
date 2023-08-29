<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Concerns;

use Illuminate\Support\Collection;

trait Sortable
{
    public function sortByTime(array|Collection $attributes): Collection
    {
        $data = $attributes->collapse();

        return (new Collection(
            items: $data
        ))->where(
            'creation_date',
            '>=',
            now()->subYear()->getTimestamp()
        )->values();
    }

    public function sortArray(array|Collection $attributes): Collection
    {
        return collect(
            value: $attributes,
        )->flatMap(function ($item) {
            return collect()->mergeRecursive($item)->sortBy(
                [
                    ['health', 'desc'],
                    ['paid_today', 'desc'],
                    ['total_users_paid', 'desc'],
                ]
            )->each(
                function ($val) {
                    data_set($val, 'currency', 'TOP');

                    return $val;
                }
            );
        })->values();
    }
}
