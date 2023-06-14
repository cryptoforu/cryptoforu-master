<?php

declare(strict_types=1);

namespace App\Interfaces\Site;

use App\Http\Requests\StoreSiteDataRequest;

interface StoreDataContract
{
    /**
     * Store Data
     */
    public function handle(StoreSiteDataRequest $request): void;
}
