<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;

class GetPageMeta
{
    /**
     * Handle Page Meta Data
     */
    public function handle(
        string $page_type = 'admin',
        string $page = 'dashboard'
    ): array {
        return Page::page($page_type, $page)
            ->first()
            ->getData()
            ->toArray();
    }
}
