<?php

declare(strict_types=1);

namespace App\Interfaces\Library;

use App\Http\Requests\UpdateLibraryRequest;
use App\Models\Library;

interface LibraryUpdateContract
{
    public function handle(
        UpdateLibraryRequest $request,
        Library $library
    ): mixed;
}
