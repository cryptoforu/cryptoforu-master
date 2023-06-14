<?php

declare(strict_types=1);

namespace App\Services\CryptoNews;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

final class CryptoNewsService
{
    public function __construct(
        public readonly string $decrypt,
    ) {

    }

    public function decrypt_news(): Collection
    {
        return new Collection(
            items: Http::read($this->decrypt)
        );
    }
}
