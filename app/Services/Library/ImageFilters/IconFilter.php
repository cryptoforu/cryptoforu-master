<?php

declare(strict_types=1);

namespace App\Services\Library\ImageFilters;

use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

final class IconFilter implements FilterInterface
{
    /**
     * {@inheritDoc}
     */
    public function applyFilter(Image $image): Image
    {
        return $image->resize(240, 240, function ($constraint): void {
            $constraint->aspectRatio();
            $constraint->upsize();
        })->encode($image->mime(), 100);
    }
}
