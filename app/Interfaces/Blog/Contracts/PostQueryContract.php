<?php

declare(strict_types=1);

namespace App\Interfaces\Blog\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface PostQueryContract
{
  /**
   * Get Single Post Query Builder
   * @return Builder
   */
  public function handle(): Builder;
}
