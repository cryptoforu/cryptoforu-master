<?php

declare(strict_types=1);

namespace App\Services\Settings;

use App\Http\Requests\StorePageRequest;
use App\Interfaces\Settings\SettingsActionInterface;
use App\Services\Settings\Enums\ActionEnum;
use App\Services\Settings\Enums\DeleteEnum;
use App\Services\Settings\Menu\Actions\DeleteMenuItem;
use App\Services\Settings\Page\Actions\DeletePageMeta;
use App\Services\Settings\Page\Actions\StorePageMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

final readonly class SettingsAction implements SettingsActionInterface
{
    public function __construct(
        private StorePageMeta $page,
        private DeleteMenuItem $deleteMenuItem,
        private DeletePageMeta $deletePageMeta,
    ) {
    }

    /**
     * Store Menu or Page Meta
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
