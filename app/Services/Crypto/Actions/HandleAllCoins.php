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
        if ('all_coins' === $data_name) {
            $all = Crypto::query()->where('data_name', 'all_coins')->first();
            $newCol = $all->data_values->merge($responses);
            $all->data_values = $newCol;
            $all->save();
        } else {
            Crypto::query()->updateOrCreate([
                'data_name' => $data_name,
            ], [
                'data_values' => $responses,
            ]);

        }

        return true;
    }
}
