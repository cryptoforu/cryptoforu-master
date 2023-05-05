<?php

declare (strict_types = 1);

namespace App\Services\Settings;

use App\Contracts\CacheStoreContract;
use App\Interfaces\Settings\MenuInterface;
use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Settings\SettingsInterface;
use App\Services\Settings\Menu\Actions\GetMenuForm;
use App\Services\Settings\Page\Actions\GetPageForm;

class SettingsService implements SettingsInterface
{
    public function __construct(
        private readonly MenuInterface $menu,
        private readonly PageInterface $page,
        private readonly GetPageForm $pageForm,
        private readonly GetMenuForm $menuForm,
        private readonly CacheStoreContract $store,
    ) {
    }

    public function forIndex(): array
    {
        $meta = $this->store->load(
            key:'settingsIndex',
            callback:[
                'meta' => $this->page->getPageMeta(
                    page_type:'admin',
                    page:'admin_settings'
                ),
                'navigation' => $this->page->getAdminNavigation(),
                'menus' => $this->menu->show(),
                'select' => $this->page->show()['select'],
            ]
        );

        return [
            ...$meta,
            ...$this->store->withInertia(
                collection:$this->page->show()['data']
            ),
        ];
    }

    public function forCreate(): array
    {
        return $this->store->load(
            key:'settingsCreate',
            callback:[
                'navigation' => $this->page->getAdminNavigation(),
                'form' => $this->pageForm->handle(),
                'menu_form' => $this->menuForm->handle(),
                'meta' => $this->page->getPageMeta(
                    page_type:'admin',
                    page:'admin_add_settings'
                ),
            ]
        );
    }
}
