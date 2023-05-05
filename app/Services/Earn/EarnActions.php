<?php

declare(strict_types=1);

namespace App\Services\Earn;

use App\Contracts\CacheStoreContract;
use App\Http\Requests\StoreEarnRequest;
use App\Http\Requests\UpdateEarnRequest;
use App\Interfaces\Earn\EarnActionInterface;
use App\Models\Earn;
use App\Services\Earn\Actions\DeleteEarn;
use App\Services\Earn\Actions\StoreEarn;
use App\Services\Earn\Actions\UpdateEarn;

class EarnActions implements EarnActionInterface
{
    /**
     * Earn Action Instance
     */
    public function __construct(
        private readonly DeleteEarn $delete,
        private readonly StoreEarn $store,
        private readonly UpdateEarn $update,
        private readonly CacheStoreContract $cacheStore,
    ) {
    }

    /**
     * Store Earn Data
     */
    public function store(StoreEarnRequest $request): bool
    {
        $store = $this->store->handle(
            request: $request,
        );
        if ($store) {
            $this->cacheStore->flushCache();

            return true;
        }

        return false;
    }

    /**
     * Update Earn Data
     */
    public function update(
        UpdateEarnRequest $request,
        Earn $earn
    ): bool {
        $update = $this->update->handle(
            request: $request,
            earn: $earn,
        );
        if ($update) {
            $this->cacheStore->flushCache();

            return true;
        }

        return false;
    }

    /**
     * Delete earn Data
     *
     * @param  string|int  $id
     */
    public function destroy(Earn $earn): bool
    {
        $delete = $this->delete->handle(
            earn: $earn,
        );
        if ($delete) {
            $this->cacheStore->flushCache();

            return true;
        }

        return false;
    }
}
