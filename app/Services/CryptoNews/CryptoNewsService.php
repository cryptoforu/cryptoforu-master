<?php

declare(strict_types=1);

namespace App\Services\CryptoNews;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

final readonly class CryptoNewsService
{
  public function __construct(
    public string $decrypt,
  ) {
  }

  public function decrypt_news(): Collection
  {
    return collect(
      value: Http::read($this->decrypt)
    );
  }
}
