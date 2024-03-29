<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Page;

final class DeletePageMeta
{
  public function __construct(
    private readonly LibraryActionsInterface $action,
  ) {
  }

  /**
   * Delete Page Meta Data
   */
  public function handle(string|int $id): bool
  {
    $page = Page::ofName($id);
    if ($page->exists) {
      if (!empty($page->images)) {
        foreach ($page->images as $img) {
          $this->action->delete($img);
        }
      }
      $page->delete();
      cache()->store('library')->clear();

      return true;
    }

    return false;
  }
}
