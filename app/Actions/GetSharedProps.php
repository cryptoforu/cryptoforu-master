<?php

declare(strict_types=1);

namespace App\Actions;

use App\Contracts\SharedPropsContract;
use App\Interfaces\Settings\GetMenuContract;
use App\Interfaces\Site\SocialLinksContract;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

final class GetSharedProps implements SharedPropsContract
{
    public function __construct(
        protected GetMenuContract $menu,
        protected SocialLinksContract $social,
    ) {
        $this->menu = $menu;
        $this->social = $social;
    }

    public function handle()
    {

        return array_merge([
            'main_menu' => $this->menu->handle(),
            'social' => $this->social->handle(),
            $this->check_admin() ?? [],
        ]);
    }

    private function check_admin()
    {
        if (Str::of(Request::path())->startsWith('admin')) {
            $sidebar = $this->menu->handle('admin_sidebar');

            return $sidebar;
        }
    }
}
