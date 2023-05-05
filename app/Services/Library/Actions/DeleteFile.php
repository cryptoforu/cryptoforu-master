<?php

declare(strict_types=1);

namespace App\Services\Library\Actions;

use App\Models\Library;
use App\Services\Library\Concerns\Destroyable;

class DeleteFile
{
    use Destroyable;

    /**
     * Destroy File
     */
    public function handle(Library $library): bool
    {
        if ($library->exists) {
            $library->delete();
            $this->destroy($library->image_url);

            return true;
        }

        return false;
    }
}
