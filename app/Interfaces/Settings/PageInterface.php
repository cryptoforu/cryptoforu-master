<?php

declare(strict_types=1);

namespace App\Interfaces\Settings;

use Illuminate\Support\Collection;

interface PageInterface
{
    /**
     * Get Page Meta Data
     */
    public function getPageMeta(string $page_type, string $page): mixed;

    /**
     * Show Pages Meta Data
     *
     * @return array
     */
    public function show(): Collection|array;

    /**
     * Undocumented function
     */
    public function getAdminNavigation(): mixed;
}
