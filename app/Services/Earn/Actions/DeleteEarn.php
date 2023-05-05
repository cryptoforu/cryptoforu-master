<?php

namespace App\Services\Earn\Actions;

use App\Models\Earn;
use App\Services\Library\Concerns\Cleanable;

class DeleteEarn
{
    use Cleanable;

    /**
     * Delete Earning Method
     */
    public function handle(Earn $earn): bool
    {
        if ($earn->exists) {
            $earn->delete();
            $this->clean([$earn->image, $earn->thumb]);

            return true;
        }

        return false;
    }
}
