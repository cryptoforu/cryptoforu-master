<?php

declare(strict_types=1);

namespace App\Actions;

use App\Contracts\SharedPropsContract;
use App\Interfaces\Settings\GetMenuContract;
use App\Interfaces\Site\SocialLinksContract;
use Illuminate\Support\Facades\Request;
use Tightenco\Ziggy\Ziggy;

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
            'admin_sidebar' => auth()->check() ? $this->menu->handle('admin_sidebar') : null,
            'ziggy' => self::ziggy(),
        ]);
    }

    private static function ziggy()
    {
        if (auth()->guest()) {
            return lazy_load()->load(
                'ziggy_front',
                fn () => (new Ziggy(
                    group: 'front',
                    url: Request::url()
                ))->toArray()
            );
        }

        return lazy_load()->load(
            'ziggy_admin',
            fn () => (new Ziggy(
                group: 'admin',
                url: Request::url()
            ))->toArray()
        );
    }
}
