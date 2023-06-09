<?php

declare(strict_types=1);

namespace App\Interfaces\Earn;

use App\Models\Earn;

interface EarnServiceInterface
{
    /**
     * Backend Index Page Data
     */
    public function forIndex(): array;

    /**
     * Create Page Data
     */
    public function forCreate(): array;

    /**
     * Edit Page Data
     */
    public function forEdit(Earn $earn): array;
}
