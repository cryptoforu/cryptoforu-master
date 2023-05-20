<?php

namespace App\Services\Library\ImageFilters;

use Illuminate\Support\Facades\Request;
use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

class PngMedium implements FilterInterface
{
    public function applyFilter(Image $image)
    {
        if (Request::query('w')) {
            return $image->widen(Request::query('w'),
                function ($constraint) {
                    $constraint->upsize();
                }
            )->encode($image->mime(), Request::query('q'));
        } else {
            return $image->widen(
                600,
                function ($constraint) {
                    $constraint->upsize();
                }
            )->encode($image->mime(), Request::query('q'));
        }

    }
}
