<?php
declare (strict_types = 1);
namespace App\Interfaces\Library;

use App\Models\Library;

interface LibraryDeleteContract
{

    /**
     * Delet Files
     *
     * @param Library $library
     * @return boolean
     */
    public function handle(Library $library): bool;
}
