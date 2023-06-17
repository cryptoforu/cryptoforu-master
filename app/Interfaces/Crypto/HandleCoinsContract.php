<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Illuminate\Support\Collection;

interface HandleCoinsContract
{
    /**
     * HandleAllCoins
     */
    public function handle(Collection $responses, string $data_name): bool;
}
