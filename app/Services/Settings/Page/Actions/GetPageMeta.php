<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use Illuminate\Support\Facades\Route;

final class GetPageMeta
{
    /**
     * Handle Page Meta Data
     */
    public function handle(
        string $page_type = 'admin',
        ?string $page = 'dashboard'
    ): array {
        return Page::ofType($page_type)
            ->route(Route::currentRouteName(), $page)
            ->first()->getData()->toArray()
        ;
    }
}
