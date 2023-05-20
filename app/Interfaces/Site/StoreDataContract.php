<?php
namespace App\Interfaces\Site;

use App\Http\Requests\StoreSiteDataRequest;

interface StoreDataContract
{
    /**
     * Store Data
     *
     * @param StoreSiteDataRequest $request
     * @return void
     */
    public function handle(StoreSiteDataRequest $request);
}
