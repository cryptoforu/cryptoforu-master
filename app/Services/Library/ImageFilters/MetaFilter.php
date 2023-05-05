<?php

namespace App\Services\Library\ImageFilters;

use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

class MetaFilter implements FilterInterface
{
    public function applyFilter(Image $image)
    {
        return $image->fit(1200, 630, function ($constraint) {
            $constraint->upsize();
        })->encode('jpg', 75);
    }
}
