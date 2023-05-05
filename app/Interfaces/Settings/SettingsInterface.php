<?php

declare(strict_types=1);

namespace App\Interfaces\Settings;

interface SettingsInterface
{
    /**
     * Index Page Data
     */
    public function forIndex(): array;

    /**
     * Create Page Data
     */
    public function forCreate(): array;
}
