<?php

declare(strict_types=1);

namespace App\Services\Library\ImageFilters;

use Illuminate\Support\Facades\Request;
use Intervention\Image\Filters\FilterInterface;
use Intervention\Image\Image;

class UpsizeFilter implements FilterInterface
{
    /**
     * {@inheritDoc}
     */
    public function applyFilter(Image $image): Image
    {
        return Request::whenHas('h', static function () use ($image) {
            return $image->heighten(
                (int) Request::query('h'),
                function ($constraint): void {
                    $constraint->upsize();
                }
            )->encode($image->mime(), 100);
        }, static function () use ($image) {
            return $image->heighten(
                786,
                function ($constraint): void {
                    $constraint->upsize();
                }
            )->encode($image->mime(), 100);
        });
    }
}
