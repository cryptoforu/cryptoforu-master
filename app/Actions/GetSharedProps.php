<?php

declare(strict_types=1);

namespace App\Actions;

use App\Contracts\SharedPropsContract;
use App\Interfaces\Settings\GetMenuContract;
use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Site\SocialLinksContract;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Tightenco\Ziggy\Ziggy;

final class GetSharedProps implements SharedPropsContract
{
    public function __construct(
        protected GetMenuContract $menu,
        protected SocialLinksContract $social,
        protected PageInterface $page,
    ) {
        $this->menu = $menu;
        $this->social = $social;
        $this->page = $page;
    }

    public function handle()
    {
        return lazy_load()->load(
            'shared_props',
            fn () => array_merge([
                'main_menu' => $this->menu->handle(),
                'social' => $this->social->handle(),
                'admin_sidebar' => self::check() ? $this->menu->handle('admin_sidebar') : null,
                'meta' => self::check() ? null : $this->page->front_meta()['meta'],
                'ziggy' => self::ziggy($this->menu->handle()),
            ])
        );
    }

    private static function check()
    {
        return (bool) (Str::of(Request::path())->startsWith('admin'));
    }

    private static function ziggy(array $menu)
    {
        $ziggy = new Ziggy($group = null, Request::url());
        $ziggy = $ziggy->toArray();
        $front = Arr::only($ziggy['routes'], array_map(fn ($item) => $item['route'], $menu));
        if (self::check()) {
            return $ziggy;
        }

        return array_merge([
            ...$ziggy,
            'routes' => $front,
        ]);
    }
}
