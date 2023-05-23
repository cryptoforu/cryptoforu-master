<?php

declare(strict_types=1);

namespace App\Services\Library\ImageFilters;

use Illuminate\Support\Facades\Request;
use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

final class MdFilter implements FilterInterface
{
    public function applyFilter(Image $image)
    {
        if (Request::query('w')) {
            return $image->widen(Request::query('w'), function ($constraint): void {
                $constraint->upsize();
            })->encode($image->mime(), 75);
        } else {
            return $image->widen(
                600,
                function ($constraint): void {
                    $constraint->upsize();
                }
            )->encode($image->mime(), 75);
        }
    }
}
