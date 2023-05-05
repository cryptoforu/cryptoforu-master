<?php

declare(strict_types=1);

namespace App\Services\Settings\Page\Actions;

use App\Models\Page;
use App\Services\Settings\Page\DataObjects\AdminNavigation;
use Illuminate\Support\Facades\Route;

class GetAdminNavigation
{
    /**
     * Admin Navigation
     */
    public function handle(): array
    {
        $route = Route::currentRouteName();
        $query = Page::route($route)
            ->with('childs')
            ->first();
        if ($query->parent_id !== 0) {
            $query->load('parents');
        }

        return AdminNavigation::from($query)->toArray();
    }
}
