<?php

declare(strict_types=1);

namespace App\Interfaces\Crypto;

use Cerbero\JsonParser\JsonParser;

interface HandleExchangesInterface
{
    public function handle(JsonParser $responses): bool;
}
