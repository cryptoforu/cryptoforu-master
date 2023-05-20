<?php

declare(strict_types=1);

namespace App\Interfaces\Site;

interface SiteInterface
{
    /**
     * For Index Site Data
     */
    public function forIndex(): array;

    /**
     * For Create Site Data
     */
    public function forCreate(): array;
}
