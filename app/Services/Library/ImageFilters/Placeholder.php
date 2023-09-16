<?php

declare(strict_types=1);

namespace App\Services\Library\ImageFilters;

use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

final readonly class Placeholder implements FilterInterface
{
  public function __construct(
    private int $width,
    private int $height,
  ) {
  }

  /**
   * {@inheritDoc}
   */
  public function applyFilter(Image $image): Image
  {
    return $image->text(
      'AD '.$this->width.'x'.$this->height,
      $this->width / 2,
      $this->height / 2,
      function ($font): void {
        $font->file(public_path('detacher.woff2'));
        $font->size(24);
        $font->color('#e2e8f0');
        $font->align('center');
        $font->valign('center');
      }
    );
  }
}
