<?php

declare(strict_types=1);

namespace App\Interfaces\Blog\Contracts;

use Illuminate\Database\Eloquent\Collection;

interface CategoryQueryContract
{
    public function handle(): Collection|array;
}
