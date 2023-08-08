<?php

namespace App\Services\Faucetpay\Concerns;

use Illuminate\Http\Client\PendingRequest;

trait BuildRequests
{
  /**
   * @param  PendingRequest  $request
   * @return mixed
   */
  public function getList(
    PendingRequest $request
  ): mixed {
    return $request->post(
      'listv1/faucetlist'
    )['list_data'];
  }
}
