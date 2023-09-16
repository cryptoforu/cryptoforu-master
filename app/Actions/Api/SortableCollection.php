<?php

declare(strict_types=1);

namespace App\Actions\Api;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Request;

final class SortableCollection
{
  public function __invoke(Collection $collection): Collection
  {
    return Request::whenHas(
      'sortAsc',
      static function () use ($collection): Collection {
        return $collection->sortBy(
          Request::query('sortAsc')
        );
      },
      static fn(): Collection => $collection
        ->sortByDesc(
          Request::query(
            'sortDesc'
          )
        ) ?? $collection
    );

  }
}
