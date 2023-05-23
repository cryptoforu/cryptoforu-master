<?php

declare(strict_types=1);

namespace App\Interfaces\Site;

use Illuminate\Http\Request;

interface DeleteDataContract
{
    /**
     * Delete Data
     *
     * @return void
     */
    public function handle(Request $request): void;
}
