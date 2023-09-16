<?php

declare(strict_types=1);

namespace App\Services\Library\ImageFilters;

use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

final class BlurDataImage implements FilterInterface
{
  /**
   * {@inheritDoc}
   */
  public function applyFilter(
    Image $image
  ): Image {
    return $image->encode('data-url', 20);
  }
}
