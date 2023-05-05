<?php

declare (strict_types = 1);

namespace App\Services\Settings\Page\Actions;

use App\Http\Requests\UpdatePageMetaRequest;
use App\Interfaces\Library\LibraryActionsInterface;
use App\Interfaces\Settings\ActionContracts\UpdatePageMetaContract;
use App\Models\Page;
use Illuminate\Support\Arr;

class UpdatePageMeta implements UpdatePageMetaContract
{
    /**
     * Library Instance
     */
    public function __construct(
        private readonly LibraryActionsInterface $library,
    ) {
    }

    /**
     * Update Page Meta
     */
    public function handle(UpdatePageMetaRequest $request, string | int $id): bool
    {
        $page = Page::find($id);
        $validated = $request->validated();
        $data = Arr::except($validated, ['meta_image', 'tw_image', 'og_image']);
        Arr::map($data, function ($item, $key) use ($page) {
            $page->$key = $item;
        });
        $page->save();
        if (empty($request->safe())) {
            return false;
        }
        cache()->store('settings')->clear();
        return true;
    }
}
