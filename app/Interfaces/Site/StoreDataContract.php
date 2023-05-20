<?php

namespace App\Interfaces\Site;

use App\Http\Requests\StoreSiteDataRequest;

interface StoreDataContract
{
    /**
     * Store Data
     *
     * @return void
     */
    public function handle(StoreSiteDataRequest $request);
}
