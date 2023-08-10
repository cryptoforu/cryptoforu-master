<?php

namespace App\Traits;

use App\Interfaces\Library\LibraryActionsInterface;
use App\Models\Library;

trait Imageable
{
  public function __construct(
    private readonly LibraryActionsInterface $library,
  ) {
  }

  /**
   * @param  mixed  $img
   * @param  string  $directory
   * @return array|null
   */
  public function check_image(mixed $img, string $directory): array|null
  {
    if (is_null($img)) {
      return null;
    }
    if (is_string($img)) {
      return Library::query()
        ->where(
          'file_name',
          $img)
        ->first()
        ->toArray();

    } else {
      return $this->library->store(
        file: $img,
        directory: $directory
      );
    }
  }
}
