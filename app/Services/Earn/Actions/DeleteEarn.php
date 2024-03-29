<?php

declare(strict_types=1);

namespace App\Services\Earn\Actions;

use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Earn;

final readonly class DeleteEarn
{
  public function __construct(
    private LibraryActionsInterface $action,
  ) {

  }

  /**
   * Delete Earning Method
   */
  public function handle(Earn $earn): bool
  {
    if ($earn->exists) {
      foreach ($earn->images as $img) {
        $this->action->delete($img);
      }
      $earn->delete();

      return true;
    }

    return false;
  }
}
