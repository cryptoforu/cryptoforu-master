<?php

declare(strict_types=1);

namespace App\Actions\Api;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Request;

class FilteredCollectionKeys
{
  /**
   * @param  Collection  $collection
   * @return Collection
   */
    public function __invoke(Collection $collection): Collection
    {
        return Request::whenHas(
            'only',
            static function () use ($collection): Collection {
                return $collection
                    ->only(Request::string('only')->split('/[\s,]+/'))
                ;
            },
            static fn (): Collection => $collection
        );
    }
}
