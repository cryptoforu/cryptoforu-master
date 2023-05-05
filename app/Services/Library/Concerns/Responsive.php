<?php

namespace App\Services\Library\Concerns;

use App\Services\Library\ImageFilters\LgFilter;
use App\Services\Library\ImageFilters\MdFilter;
use App\Services\Library\ImageFilters\SmFilter;
use Illuminate\Http\UploadedFile;
use Intervention\Image\Facades\Image;

trait Responsive
{
    use Directories;

    public function responsive(UploadedFile $file, $directory)
    {
        $lg = new LgFilter();
        $md = new MdFilter();
        $sm = new SmFilter();
        $paths = [
            'lg' => $this->directory($directory.'/'.'Conversions').'/'.uniqid().'Lg.'.$file->getClientOriginalExtension(),
            'md' => $this->directory($directory.'/'.'Conversions').'/'.uniqid().'Md.'.$file->getClientOriginalExtension(),
            'sm' => $this->directory($directory.'/'.'Conversions').'/'.uniqid().'Sm.'.$file->getClientOriginalExtension(),
        ];

        $image = Image::make($file);
        $lg->applyFilter($image)->save(public_path($paths['lg']));
        $md->applyFilter($image)->save(public_path($paths['md']));
        $sm->applyFilter($image)->save(public_path($paths['sm']));

        return $paths;
    }
}
