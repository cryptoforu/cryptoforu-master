<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleExchangesInterface;
use App\Models\Crypto;
use Illuminate\Support\Collection;

class HandleExchanges implements HandleExchangesInterface
{
    public function handle(Collection $responses): bool
    {
        if (Crypto::ofName('exchanges')) {
            Crypto::ofName('exchanges')->update([
                'data_values' => $responses,
            ]);

            return true;
        }
        Crypto::create([
            'data_name' => 'exchanges',
            'data_values' => $responses,
        ]);

        return true;
    }
}
