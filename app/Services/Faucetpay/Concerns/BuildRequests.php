<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Concerns;

use Illuminate\Http\Client\PendingRequest;

trait BuildRequests
{
    public function getList(
        PendingRequest $request
    ): mixed {
        return $request->post(
            'listv1/faucetlist'
        )['list_data'];
    }
}
