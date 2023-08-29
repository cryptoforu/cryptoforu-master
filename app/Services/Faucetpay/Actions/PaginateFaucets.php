<?php

declare(strict_types=1);

namespace App\Services\Faucetpay\Actions;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Request;

final class PaginateFaucets
{
    public function __invoke(array $data): Collection
    {
        return Request::whenHas(
            'page',
            static fn () => collect(
                data_get($data, 'list.data')
            ),
            static fn () => collect(
                data_get($data, 'list')
            )
        );
    }
}
