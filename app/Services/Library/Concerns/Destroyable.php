<?php

declare(strict_types=1);

namespace App\Services\Library\Concerns;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

trait Destroyable
{
    public function destroy(object $file)
    {

        if (Storage::fileExists($file->file_url)) {
            Storage::delete($file->file_url);
            Arr::map($file->file_conversions, function ($value, $key): void {
                Storage::delete($value);
            });

            return true;
        }

        return false;
    }
}
