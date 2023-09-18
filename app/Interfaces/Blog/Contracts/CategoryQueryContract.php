<?php

declare(strict_types=1);

namespace App\Interfaces\Blog\Contracts;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\QueryBuilder;

interface CategoryQueryContract
{
  public function handle(Category $category): Collection|Model|QueryBuilder;
}
