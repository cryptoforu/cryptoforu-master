<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCoinsContract;
use App\Models\Crypto;
use Illuminate\Support\Collection;

class HandleAllCoins implements HandleCoinsContract
{
    public function handle(Collection $responses)
    {
        $query = Crypto::ofName('all_coins');
        if ($query) {
            $collect = $query->data_values->merge($responses);
            $query->data_values = $collect;
            $query->save();

            return true;
        } else {
            Crypto::create([
                'data_name' => 'all_coins',
                'data_values' => $responses,
            ]);

            return true;
        }

        return false;
    }
}
