<?php

declare(strict_types=1);

namespace App\Interfaces\Blog\Contracts;

interface SharedQueriesContract
{
  /**
   * Get Latest Posts
   * Updated Daily
   * @param int $limit
   * @return array
   */
  public function latest(int $limit): array;

  /**
   * Get Related Posts
   * @param string|null $slug
   * @param int|null $id
   * @return array
   */

  public function related(
    ?string $slug = null,
    ?int $id = null
  ): array;
}
