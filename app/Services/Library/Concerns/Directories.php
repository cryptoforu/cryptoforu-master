<?php

declare(strict_types=1);

namespace App\Services\Library\Concerns;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

trait Directories
{
    public function directory(
        string $directory
    ) {
        $storage = Storage::allDirectories(public_path('images'));
        $path = 'images/'.$directory;
        if (Arr::exists(
            array: $storage,
            key: $directory
        )) {
            return $path;
        } else {
            Storage::makeDirectory($path);

            return $path;
        }
    }
}
