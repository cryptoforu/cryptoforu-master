<?php

declare(strict_types=1);

namespace App\Services\Library\Concerns;

use Illuminate\Support\Facades\Storage;

trait Destroyable
{
    public function destroy(string $file_path)
    {
        if (Storage::fileExists($file_path)) {
            Storage::delete($file_path);

            return true;
        }

        return false;
    }
}
