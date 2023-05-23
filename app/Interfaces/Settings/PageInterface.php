<?php

declare(strict_types=1);

namespace App\Interfaces\Settings;

use Illuminate\Support\Collection;

interface PageInterface
{
    /**
     * Get Front Meta
     */
    public function front_meta(?string $page = null): array;

    /**
     * Get Admin Meta
     */
    public function admin_meta(?string $page = null): array;

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
