<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Actions;

use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class GetNewFaucets
{
    /**
     * @return array
     */
    public function __invoke(Collection $collection): Collection
    {

        return $collection->flatMap(fn ($item) => collect()->mergeRecursive($item['list_data']))->filter(function ($item) {
            $beforeTime = Carbon::now('Europe/Sarajevo')->subMonths(1);
            $dt = Carbon::parse($item['creation_date'], 'Europe/Sarajevo');
            $compare = Carbon::parse($beforeTime);

            return $dt->greaterThanOrEqualTo($compare);
        })->values();
    }
}
