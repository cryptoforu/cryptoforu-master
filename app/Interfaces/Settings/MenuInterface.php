<?php

declare(strict_types=1);

namespace App\Interfaces\Settings;

interface MenuInterface
{
    /**
     * Get Menu
     */
    public function getMenu(string $position);

    /**
     * Show Menus
     */
    public function show(): mixed;
}
