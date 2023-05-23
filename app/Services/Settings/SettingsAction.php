<?php

declare(strict_types=1);

namespace App\Services\Settings;

use App\Http\Requests\StorePageRequest;
use App\Interfaces\Settings\SettingsActionInterface;
use App\Services\Settings\Enums\ActionEnum;
use App\Services\Settings\Enums\DeleteEnum;
use App\Services\Settings\Menu\Actions\DeleteMenuItem;
use App\Services\Settings\Menu\Actions\StoreMenuItems;
use App\Services\Settings\Page\Actions\DeletePageMeta;
use App\Services\Settings\Page\Actions\StorePageMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

final class SettingsAction implements SettingsActionInterface
{
    private $action;

    public function __construct(
        private readonly StorePageMeta $page,
        private readonly StoreMenuItems $menu,
        private readonly DeleteMenuItem $deleteMenuItem,
        private readonly DeletePageMeta $deletePageMeta,
    ) {
    }

    public function setAction(ActionEnum $action): void
    {
        $this->action = $action;
    }

    /**
     * Store Menu or Page Meta
     *
     * @param  Request  $from
     */
    public function store(
        StorePageRequest $from,
        ActionEnum $action
    ): void {
        $this->page->handle(
            from: $from
        );
        Cache::flush();
    }

    public function destroy(Request $request, string|int $id): bool
    {
        $enum = $request->input('delete');
        if (DeleteEnum::tryFrom($enum)->equals(DeleteEnum::delete_menu())) {
            $this->deleteMenuItem->handle(
                id: $id,
            );
            Cache::flush();

            return true;
        }
        if (DeleteEnum::tryFrom($enum)->equals(DeleteEnum::delete_page())) {
            $this->deletePageMeta->handle(
                id: $id,
            );
            Cache::flush();

            return true;
        }

        return false;
    }
}
