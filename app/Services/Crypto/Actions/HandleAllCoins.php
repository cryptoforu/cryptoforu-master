<?php

declare(strict_types=1);

namespace App\Services\Crypto\Actions;

use App\Interfaces\Crypto\HandleCoinsContract;
use App\Models\Crypto;
use Illuminate\Support\Collection;

final class HandleAllCoins implements HandleCoinsContract
{
    public function handle(Collection $responses, string $data_name): bool
    {
        $query = Crypto::ofName($data_name);
        if ($query) {
            $replaced = $query->data_values->lazy()->replace($responses);
            $query->data_values = $replaced;
            $query->save();

            return true;
        }
        Crypto::create([
            'data_name' => $data_name,
            'data_values' => $responses,
        ]);

        return true;

    }
}
