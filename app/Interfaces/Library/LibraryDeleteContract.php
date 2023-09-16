<?php

declare(strict_types=1);

namespace App\Interfaces\Library;

use App\Models\Library;

interface LibraryDeleteContract
{
  /**
   * Delete Files
   */
  public function handle(Library $library, bool $destroy): bool;
}
