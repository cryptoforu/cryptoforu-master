<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use App\Services\Settings\Page\DataObjects\AdminNavigation;
use Illuminate\Support\Facades\Route;

final class GetAdminNavigation
{
    /**
     * Admin Navigation
     */
    public function handle(?string $fallback = null): array
    {
        $route = Route::currentRouteName();
        $query = Page::route($route, $fallback)
            ->with('childs')
            ->first()
        ;
        if (0 !== $query->parent_id) {
            $query->load('parents');
        }

        return AdminNavigation::from($query)->toArray();
    }
}
