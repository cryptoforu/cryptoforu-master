<?php

namespace App\Services\Library\ImageFilters;

use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

class AspectHeight implements FilterInterface
{

  /**
   * @inheritDoc
   */
  public function applyFilter(Image $image): Image
  {
    return $image->resize(1398, 786);
  }
}
