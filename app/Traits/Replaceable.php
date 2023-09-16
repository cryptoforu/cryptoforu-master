<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Support\Collection;

trait Replaceable
{
  /**
   * @return false|mixed
   */
  public function findSite(array $sites, string $id): mixed
  {

    if (array_key_exists($id, $sites)) {
      return $sites[$id];
    }

    return false;
  }

  public function replace(
    Collection $items,
    array $replace
  ): Collection {

    return $items->map(function ($item) use ($replace) {

      foreach ($replace as $key => $value) {
        if ($item['id'] === $key) {
          $item['url'] = $value;

          return $item;
        }
      }

      return $item;

    });
  }
}
