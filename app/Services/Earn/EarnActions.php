<?php

declare(strict_types=1);

namespace App\Services\Earn;

use App\Http\Requests\StoreEarnRequest;
use App\Http\Requests\UpdateEarnRequest;
use App\Interfaces\Earn\EarnActionInterface;
use App\Models\Earn;
use App\Services\Earn\Actions\DeleteEarn;
use App\Services\Earn\Actions\StoreEarn;
use App\Services\Earn\Actions\UpdateEarn;
use Illuminate\Support\Facades\Cache;

final class EarnActions implements EarnActionInterface
{
  /**
   * Earn Action Instance
   */
  public function __construct(
    private readonly DeleteEarn $delete,
    private readonly StoreEarn $store,
    private readonly UpdateEarn $update,
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
      Cache::flush();

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
      Cache::flush();

      return true;
    }

    return false;
  }

  /**
   * Delete earn Data
   *
   * @param  Earn  $earn
   * @return bool
   */
  public function destroy(Earn $earn): bool
  {
    $delete = $this->delete->handle(
      earn: $earn,
    );
    if ($delete) {
      Cache::flush();

      return true;
    }

    return false;
  }
}
