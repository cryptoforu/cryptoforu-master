<?php

namespace App\Services\Library\ImageFilters;

use Illuminate\Support\Facades\Request;
use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

class PngSmall implements FilterInterface
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
                1200,
                function ($constraint) {
                    $constraint->upsize();
                }
            )->encode($image->mime(), Request::query('q'));
        }

    }
}