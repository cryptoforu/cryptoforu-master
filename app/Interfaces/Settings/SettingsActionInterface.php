<?php

declare(strict_types=1);

namespace App\Interfaces\Settings;

use App\Http\Requests\StorePageRequest;
use App\Services\Settings\Enums\ActionEnum;
use Illuminate\Http\Request;

interface SettingsActionInterface
{
  /**
   * Store Settings
   */
  public function store(StorePageRequest $from, ActionEnum $action): void;

  /**
   * Destroy Menu Or Meta
   *
   * @param  Request  $request
   * @param  string|int  $id
   * @return bool
   */
  public function destroy(Request $request, string|int $id): bool;
}
