<?php

declare(strict_types=1);

namespace App\Interfaces\Earn;

use App\Http\Requests\StoreEarnRequest;
use App\Http\Requests\UpdateEarnRequest;
use App\Models\Earn;

interface EarnActionInterface
{
    /**
     * Store Earn Data
     */
    public function store(StoreEarnRequest $request): bool;

    /**
     * Update Earn Data
     */
    public function update(
        UpdateEarnRequest $request,
        Earn $earn
    ): bool;

    /**
     * Delete earn Data
     *
     * @param  string|int  $id
     */
    public function destroy(Earn $earn): bool;
}
