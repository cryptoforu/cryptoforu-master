<?php

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use App\Services\Library\Concerns\Cleanable;

class DeletePageMeta
{
    use Cleanable;

    /**
     * Delete Page Meta Data
     */
    public function handle(string | int $id): bool
    {
        $page = Page::ofName($id);
        if ($page->exists) {
            $page->delete();
            $this->clean([$page->meta_image, $page->tw_image, $page->og_image]);
            cache()->store('library')->clear();
            return true;
        }

        return false;
    }
}
