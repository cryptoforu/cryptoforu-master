<?php

declare (strict_types = 1);

namespace App\Http\Middleware;

use App\Interfaces\Settings\MenuInterface;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    public function __construct(
        private readonly MenuInterface $menu
    ) {
    }

    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request):  ? string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     */
    public function share(Request $request) : array
    {
        $ziggy = new Ziggy($group = null, $request->url());
        $ziggy = $ziggy->toArray();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn() => $request->session()->get('success'),
                'warning' => fn() => $request->session()->get('warning'),
            ],
            'ziggy' => $ziggy,
            'cookies' => $request->header('cookie', '') ?? '',
            'admin_sidebar' => $request->is('admin') ? $this->menu->getMenu('admin_sidebar') : null,
            'main_menu' => $this->menu->getMenu('front_main'),

        ]);
    }
}
