<?php

declare(strict_types=1);

namespace App\Interfaces\Settings;

interface GetMenuContract
{
    public function handle(string $position = 'front_main'): array;
}
