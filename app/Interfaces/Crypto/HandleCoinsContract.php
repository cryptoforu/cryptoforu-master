<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Illuminate\Http\Client\Response;

interface HandleCoinsContract
{
    /**
     * HandleAllCoins
     */
    public function handle(Response|array $responses, string $data_name): bool;
}
