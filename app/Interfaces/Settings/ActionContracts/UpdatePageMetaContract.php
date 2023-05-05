<?php

declare (strict_types = 1);

namespace App\Interfaces\Settings\ActionContracts;

use App\Http\Requests\UpdatePageMetaRequest;
use App\Models\Page;

interface UpdatePageMetaContract
{
    /**
     * Update Page Meta
     */
    public function handle(UpdatePageMetaRequest $request, string | int $id): bool;
}
