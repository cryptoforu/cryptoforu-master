<?php

declare(strict_types=1);

namespace App\Interfaces\Blog\Contracts;

use Illuminate\Database\Eloquent\Builder;

interface AllPostsContract
{
    public function handle(Builder $query): Builder;
}
