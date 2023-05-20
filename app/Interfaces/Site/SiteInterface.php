<?php
declare (strict_types = 1);
namespace App\Interfaces\Site;

interface SiteInterface
{
    /**
     * For Index Site Data
     *
     * @return array
     */
    public function forIndex(): array;

    /**
     * For Create Site Data
     *
     * @return array
     */
    public function forCreate(): array;
}
