<?php

declare (strict_types = 1);

namespace App\Interfaces\Library;

interface LibraryResourceInterface
{
    /**
     * Library BAckend Index Page
     */
    public function forIndex(): array;
    /**
     * Upload Page Data
     *
     * @return array
     */
    public function forCreate(): array;
}
