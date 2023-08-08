<?php

declare(strict_types=1);

namespace App\Contracts;

interface ApiCacheContract
{
    public function load_data(string $key, mixed $callback): mixed;

    public function flush_data(): void;
}
