<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCoinsContract;
use App\Models\Crypto;
use Illuminate\Support\Collection;

final class HandleAllCoins implements HandleCoinsContract
{
    public function handle(Collection $responses): bool
    {
        $query = Crypto::ofName('all_coins');
        if ($query) {
            $query->data_values = $responses;
            $query->save();

            return true;
        }
        Crypto::create([
            'data_name' => 'all_coins',
            'data_values' => $responses,
        ]);

        return true;

    }
}
