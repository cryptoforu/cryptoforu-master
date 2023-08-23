<?php

declare(strict_types=1);

namespace App\Services\Library\ImageFilters;

use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

final class MetaFilter implements FilterInterface
{
    public function applyFilter(Image $image): Image
    {
        return $image->fit(1200, 630, function ($constraint): void {
            $constraint->upsize();
        })->encode('jpg', 75);
    }
}
