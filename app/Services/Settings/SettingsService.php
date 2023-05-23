<?php

declare(strict_types=1);

namespace App\Services\Settings;

use App\Interfaces\Settings\MenuInterface;
use App\Interfaces\Settings\PageInterface;
use App\Interfaces\Settings\SettingsInterface;
use App\Services\Settings\Menu\Actions\GetMenuForm;
use App\Services\Settings\Page\Actions\GetPageForm;

final class SettingsService implements SettingsInterface
{
    public function __construct(
        private readonly MenuInterface $menu,
        private readonly PageInterface $page,
        private readonly GetPageForm $pageForm,
        private readonly GetMenuForm $menuForm,
    ) {
    }

    public function forIndex(): array
    {
        $meta = lazy_load()->load(
            key: 'admin_settings_data',
            callback: fn () => array_merge([
                ...$this->page->admin_meta(),
                'menus' => $this->menu->show(),
                'select' => $this->page->show()['select'],
            ])
        );

        return [
            ...$meta,
            ...lazy_load()->withInertia(
                collection: $this->page->show()['data']
            ),
        ];
    }

    public function forCreate(): array
    {
        return lazy_load()->load(
            key: 'settingsCreate',
            callback: fn () => array_merge([
                ...$this->page->admin_meta(),
                'form' => $this->pageForm->handle(),
                'menu_form' => $this->menuForm->handle(),
            ])
        );
    }
}
